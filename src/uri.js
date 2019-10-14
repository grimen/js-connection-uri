
/* =========================================
      IMPORTS
-------------------------------------- */

const qs = require('query-string')

const mybad = require('@grimen/mybad')


/* =========================================
      CONSTANTS
-------------------------------------- */

const DEFAULT_URI = undefined
const DEFAULT_URI_PROTOCOL = 'http'
const DEFAULT_URI_AUTH = undefined
const DEFAULT_URI_HOST = 'localhost'
const DEFAULT_URI_PORT = 80
const DEFAULT_URI_ENDPOINT = [`${DEFAULT_URI_HOST}`, `${DEFAULT_URI_PORT}`].join(':')
const DEFAULT_URI_PATH = '/'
const DEFAULT_URI_QUERY = {}

const URI_TEST_PATTERN = /^[a-z]+\:\/{2}/i


/* =========================================
      ERRORS
-------------------------------------- */

class URIError extends mybad.Error {}


/* =========================================
      FUNCTIONS
-------------------------------------- */

function serialize (value) {
    try {
        if (!value) {
            return null
        }

        if (typeof value !== 'object') {
            value = {}
        }

        let protocol = value['protocol'] || DEFAULT_URI_PROTOCOL
        let auth = value['auth'] || DEFAULT_URI_AUTH
        let host = value['host'] || DEFAULT_URI_HOST
        let hosts = value['hosts'] || [host]
        let port = value['port'] || DEFAULT_URI_PORT
        let ports = value['ports'] || [port]
        let path = value['path'] || DEFAULT_URI_PATH
        let query = value['query'] || DEFAULT_URI_QUERY

        // TODO: add sophisticated support for `auth` (~credentials)

        let endpoints = []

        for (const [index, host] of Object.entries(hosts)) {
            port = ports[index] || port

            const endpoint = [host, port].filter(Boolean).join(':')

            endpoints = [...endpoints, endpoint]
        }

        endpoints = endpoints.join(',')

        const queryString = qs.stringify(query)

        let result = `${protocol}://${auth}@${endpoints}${path}?${queryString}`

        result = result.replace(/undefined|null/gmi, '')
        result = result.replace(':@', '@')
        result = result.replace('//@', '//')

        if (!queryString || queryString === '') {
            result = result.replace('?', '')
        }

        return result

    } catch (error) {
        throw new URIError(error, {
            details: {
                value,
            },
        })
    }
}

function deserialize (value) {
    try {
        if (!value) {
            return null
        }

        value = value || DEFAULT_URI

        // NOTE: not using regular expressions approach to avoid performance issues (significant for edge cases)

        let protocol = undefined
        let auth = undefined

        let endpoint = undefined
        let endpoints = []
        let host = undefined
        let hosts = []
        let port = undefined
        let ports = []

        let path = undefined
        let query = undefined

        let nextSegment = `${value}`

        try {
            if (nextSegment.includes('://')) {
                protocol = nextSegment.split('://')[0]
                nextSegment = nextSegment.split('://').slice(1).join('://')

            } else {
                protocol = DEFAULT_URI_PROTOCOL
            }

        } catch (error) {
            protocol = DEFAULT_URI_PROTOCOL

        } finally {
            if (!protocol || (protocol === '') || (protocol === '0')) {
                protocol = DEFAULT_URI_PROTOCOL
            }
        }

        try {
            if (nextSegment.includes('@')) {
                auth = nextSegment.split('@')[0]
                nextSegment = nextSegment.split('@').slice(1).join('@')

            } else{
                auth = DEFAULT_URI_AUTH
            }

        } catch (error) {
            auth = DEFAULT_URI_AUTH

        } finally {
            if (!auth || (auth === '') || (auth === '0')) {
                auth = DEFAULT_URI_AUTH
            }
        }

        try {
            if (nextSegment.startsWith('/')) {
                endpoint = DEFAULT_URI_ENDPOINT

            } else {
                endpoint = nextSegment.split('/')[0]
                nextSegment = nextSegment.split('/').slice(1).join('/')
            }

        } catch (error) {
            endpoint = DEFAULT_URI_ENDPOINT

        } finally {
            if (!endpoint || (endpoint === '') || (endpoint === '0')) {
                endpoint = DEFAULT_URI_ENDPOINT
            }
        }

        try {
            endpoints = endpoint.split(',')

            for (let [index, endpoint] of Object.entries(endpoints)) {
                let endpointParts = endpoint.split(':')

                hasPort = Boolean((endpointParts.length > 1) && endpointParts[1].length)

                if (!hasPort) {
                    endpoint = `${endpoint}:${DEFAULT_URI_PORT}`
                }

                endpoints[index] = endpoint
            }

            for (let endpoint of endpoints) {
                if (endpoint && endpoint.length) {
                    let endpointParts = endpoint.split(':')

                    host = endpointParts[0] || DEFAULT_URI_HOST

                    if (!host || (host === '') || (host === '0')) {
                        host = DEFAULT_URI_HOST
                    }

                    hosts.push(host)

                    port = endpointParts[1] || DEFAULT_URI_PORT
                    port = parseInt(`${port}`.replace(':', ''))

                    if (!port || (port === '') || (port === '0')) {
                        port = DEFAULT_URI_PORT
                    }

                    ports.push(port)
                }
            }
        } catch (error) {}

        endpoint = endpoints[0]
        host = hosts[0]
        port = ports[0]

        try {
            if (nextSegment.includes('?')) {
                path = nextSegment.split('?')[0]

            } else {
                path = nextSegment
            }

            nextSegment = nextSegment.split('?').slice(1).join('?')

            if (!path.startsWith('/')) {
                path = `/${path}`
            }

        } catch (error) {
            path = DEFAULT_URI_PATH

        } finally {
            if (!path || (path === '') || (path === '0')) {
                path = DEFAULT_URI_PATH
            }
        }

        try {
            if (nextSegment.includes('?')) {
                query = nextSegment.split('?')[1]

            } else {
                query = DEFAULT_URI_QUERY
            }

        } catch (error) {
            query = DEFAULT_URI_QUERY

        } finally {
            if (!query || query === '' || query === '0') {
                query = DEFAULT_URI_QUERY
            }
        }

        auth = auth && auth.trim()
        credentials = {
            'username': undefined,
            'password': undefined,
        }

        if (auth) {
            auth = auth.split('://')[1] || auth // handle potential `protocol` clash

            if (auth === ':') {
                auth = undefined
            }

            if (auth && auth.length) {
                authObject = auth.split(':')

                username = (authObject[0] || '').trim()
                password = (authObject[1] || '').trim()

                if (!username.length) {
                    username = undefined
                }

                if (!password.length) {
                    password = undefined
                }

                credentials['username'] = username
                credentials['password'] = password

            } else {
                auth = undefined
            }
        }

        key = path && path.replace(/^\//, '').replace(/\/$/, '').trim()

        if (!key.length) {
            key = undefined
        }

        const namespace = key

        result = {
            protocol,
            auth,

            endpoint,
            endpoints,

            host,
            hosts,

            port,
            ports,

            path,
            query,

            // commonly useful values

            credentials,

            key,
            namespace,
        }

        url = serialize(result)

        result['url'] = url

        urls = []

        for (const [index, endpoint] of Object.entries(endpoints)) {
            endpointResult = {
                protocol,
                auth,

                endpoint,
                endpoints: [endpoint],

                host,
                hosts: [hosts[index]],

                port,
                ports: [ports[index]],

                path,
                query,

                // commonly useful values

                credentials,

                key,
                namespace,
            }

            endpointURL = serialize(endpointResult)

            urls.push(endpointURL)
        }

        result['urls'] = urls

        return result

    } catch (error) {
        throw new URIError(error, {
            details: {
                value,
            },
        })
    }
}

function pack (...args) {
    return serialize(...args)
}

function unpack (...args) {
    return deserialize(...args)
}

function stringify (...args) {
    return serialize(...args)
}

function parse (...args) {
    return deserialize(...args)
}

function get (value) {
    if (typeof value === 'string') {
        value = deserialize(value)
        value = serialize(value)

    } else {
        value = serialize(value)
        value = deserialize(value)
    }

    return value
}

function test (value) {
    try {
        if (!value) {
            return false
        }

        if (typeof value !== 'string') {
            return false
        }

        result = URI_TEST_PATTERN.test(value)

        return result

    } catch (error) {
        throw new URIError(error, {
            details: {
                value,
            },
        })
    }
}


/* =========================================
      EXPORTS
-------------------------------------- */

module.exports = {
    serialize,
    deserialize,

    pack,
    unpack,

    stringify,
    parse,

    get,

    test,
}
