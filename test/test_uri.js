/* global jest describe test expect */

// =========================================
//       IMPORTS
// --------------------------------------

const uri = require('../src/uri')


// =========================================
//       EXTENSIONS
// --------------------------------------

expect.extend(require('jest-tobetype'))


// =========================================
//       TESTS
// --------------------------------------

describe('uri', () => {

    test('import', () => {
        expect(uri).toBeInstanceOf(Object)
    })

    describe('serialize', () => {
        let serialize

        for (const serializerKey of ['serialize', 'pack', 'stringify']) {
            serialize = uri[serializerKey]

            expect(serialize).toBeType('function')

            test(`${serializerKey}: bad args`, async () => {
                let result

                result = serialize(undefined)
                expect(result).toEqual(null)

                result = serialize(null)
                expect(result).toEqual(null)
            })

            test(`${serializerKey}: single host`, async () => {
                let result

                result = serialize({'path': '/'})
                expect(result).toEqual('http://localhost:80/')

                result = serialize({'host': 'localhost'})
                expect(result).toEqual('http://localhost:80/')

                result = serialize({'host': 'localhost', 'port': 3000})
                expect(result).toEqual('http://localhost:3000/')

                result = serialize({'protocol': 'http', 'host': 'localhost', 'port': 3000})
                expect(result).toEqual('http://localhost:3000/')

                result = serialize({'protocol': 'https', 'host': 'localhost', 'port': 3000})
                expect(result).toEqual('https://localhost:3000/')

                result = serialize({'path': '/namespace'})
                expect(result).toEqual('http://localhost:80/namespace')

                result = serialize({'path': '/namespace/'})
                expect(result).toEqual('http://localhost:80/namespace/')

                result = serialize({'host': 'localhost', 'path': '/namespace'})
                expect(result).toEqual('http://localhost:80/namespace')

                result = serialize({'host': 'localhost', 'path': '/namespace/'})
                expect(result).toEqual('http://localhost:80/namespace/')

                result = serialize({'path': '/localhost/namespace'})
                expect(result).toEqual('http://localhost:80/localhost/namespace')

                result = serialize({'path': '/localhost/namespace/'})
                expect(result).toEqual('http://localhost:80/localhost/namespace/')

                result = serialize({'host': 'localhost', 'port': 3000, 'path': '/namespace'})
                expect(result).toEqual('http://localhost:3000/namespace')

                result = serialize({'host': 'localhost', 'port': 3000, 'path': '/namespace/'})
                expect(result).toEqual('http://localhost:3000/namespace/')

                result = serialize({'protocol': 'http', 'host': 'localhost', 'port': 3000})
                expect(result).toEqual('http://localhost:3000/')

                result = serialize({'protocol': 'https', 'host': 'localhost', 'port': 3000})
                expect(result).toEqual('https://localhost:3000/')

                result = serialize({'protocol': 'foo', 'host': 'ds143144-a0.mlab.com', 'port': 43144, 'auth': 'm+4.gTe~5e^(:m+4.gTe~5e^(', 'path': '/bar-baz'})
                expect(result).toEqual('foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144/bar-baz')
            })

            test(`${serializerKey}: multiple \`host\` (array<string>)`, async () => {
                let result

                result = serialize({'hosts': ['localhost', 'foohost']})
                expect(result).toEqual('http://localhost:80,foohost:80/')

                result = serialize({'hosts': ['localhost', 'foohost'], 'path': '/namespace'})
                expect(result).toEqual('http://localhost:80,foohost:80/namespace')

                result = serialize({'hosts': ['localhost', 'foohost'], 'path': '/namespace/'})
                expect(result).toEqual('http://localhost:80,foohost:80/namespace/')
            })

            test(`${serializerKey}: multiple \`host\` (array<string>) + single \`port\` (int)`, async () => {
                let result

                result = serialize({'hosts': ['localhost', 'foohost'], 'port': 3000})
                expect(result).toEqual('http://localhost:3000,foohost:3000/')

                result = serialize({'protocol': 'http', 'hosts': ['localhost', 'foohost'], 'port': 3000})
                expect(result).toEqual('http://localhost:3000,foohost:3000/')

                result = serialize({'protocol': 'https', 'hosts': ['localhost', 'foohost'], 'port': 3000})
                expect(result).toEqual('https://localhost:3000,foohost:3000/')

                result = serialize({'hosts': ['localhost', 'foohost'], 'port': 3000, 'path': '/namespace'})
                expect(result).toEqual('http://localhost:3000,foohost:3000/namespace')

                result = serialize({'hosts': ['localhost', 'foohost'], 'port': 3000, 'path': '/namespace/'})
                expect(result).toEqual('http://localhost:3000,foohost:3000/namespace/')

                result = serialize({'protocol': 'http', 'hosts': ['localhost', 'foohost'], 'port': 3000})
                expect(result).toEqual('http://localhost:3000,foohost:3000/')

                result = serialize({'protocol': 'https', 'hosts': ['localhost', 'foohost'], 'port': 3000})
                expect(result).toEqual('https://localhost:3000,foohost:3000/')

                result = serialize({'protocol': 'foo', 'hosts': ['ds143144-a0.mlab.com', 'ds143144-a1.mlab.com'], 'port': 43144, 'auth': 'm+4.gTe~5e^(:m+4.gTe~5e^(', 'path': '/bar-baz'})
                expect(result).toEqual('foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43144/bar-baz')
            })

            test(`${serializerKey}: multiple \`host\` (array<string>) + multiple \`port\` (array<int>)`, async () => {
                let result

                result = serialize({'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001]})
                expect(result).toEqual('http://localhost:3000,foohost:3001/')

                result = serialize({'protocol': 'http', 'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001]})
                expect(result).toEqual('http://localhost:3000,foohost:3001/')

                result = serialize({'protocol': 'https', 'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001]})
                expect(result).toEqual('https://localhost:3000,foohost:3001/')

                result = serialize({'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001], 'path': '/namespace'})
                expect(result).toEqual('http://localhost:3000,foohost:3001/namespace')

                result = serialize({'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001], 'path': '/namespace/'})
                expect(result).toEqual('http://localhost:3000,foohost:3001/namespace/')

                result = serialize({'protocol': 'http', 'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001]})
                expect(result).toEqual('http://localhost:3000,foohost:3001/')

                result = serialize({'protocol': 'https', 'hosts': ['localhost', 'foohost'], 'ports': [3000, 3001]})
                expect(result).toEqual('https://localhost:3000,foohost:3001/')

                result = serialize({'protocol': 'foo', 'hosts': ['ds143144-a0.mlab.com', 'ds143144-a1.mlab.com'], 'ports': [43144, 43145], 'auth': 'm+4.gTe~5e^(:m+4.gTe~5e^(', 'path': '/bar-baz'})
                expect(result).toEqual('foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43145/bar-baz')
            })
        }
    })

    describe('deserialize', () => {
        let deserialize

        // for (const deserializerKey of ['deserialize', 'unpack', 'parse']) {
        for (const deserializerKey of ['deserialize']) {
            deserialize = uri[deserializerKey]

            expect(deserialize).toBeType('function')

            let username = 'AZaz09+,/='
            let password = username.split('').reverse().join('')
            let credentials = {
                'username': 'AZaz09+,/=',
                'password': password,
            }

            test(`${deserializerKey}: bad args`, async () => {
                let result

                result = deserialize(undefined)
                expect(result).toEqual(null)

                result = deserialize(null)
                expect(result).toEqual(null)
            })

            test(`${deserializerKey}: begins with \`path\``, async () => {
                let result

                result = deserialize('/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('/namespace')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:80/namespace',
                    'urls': [
                        'http://localhost:80/namespace',
                    ],
                })

                result = deserialize('/namespace/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:80/namespace/',
                    'urls': [
                        'http://localhost:80/namespace/',
                    ],
                })

                result = deserialize('/namespace/foo')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:80/namespace/foo',
                    'urls': [
                        'http://localhost:80/namespace/foo',
                    ],
                })

                result = deserialize('/namespace/foo/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:80/namespace/foo/',
                    'urls': [
                        'http://localhost:80/namespace/foo/',
                    ],
                })

                result = deserialize('/localhost/namespace')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/localhost/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'localhost/namespace',
                    'namespace': 'localhost/namespace',

                    'url': 'http://localhost:80/localhost/namespace',
                    'urls': [
                        'http://localhost:80/localhost/namespace',
                    ],
                })

                result = deserialize('/localhost/namespace/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/localhost/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'localhost/namespace',
                    'namespace': 'localhost/namespace',

                    'url': 'http://localhost:80/localhost/namespace/',
                    'urls': [
                        'http://localhost:80/localhost/namespace/',
                    ],
                })
            })

            test(`${deserializerKey}: begins with \`host\``, async () => {
                let result

                result = deserialize('localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('localhost/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('localhost:3000')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000/',
                    'urls': [
                        'http://localhost:3000/',
                    ],
                })

                result = deserialize('localhost:3000/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000/',
                    'urls': [
                        'http://localhost:3000/',
                    ],
                })

                result = deserialize('localhost/namespace')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:80/namespace',
                    'urls': [
                        'http://localhost:80/namespace',
                    ],
                })

                result = deserialize('localhost/namespace/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:80/namespace/',
                    'urls': [
                        'http://localhost:80/namespace/',
                    ],
                })

                result = deserialize('localhost/namespace/foo')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:80/namespace/foo',
                    'urls': [
                        'http://localhost:80/namespace/foo',
                    ],
                })

                result = deserialize('localhost/namespace/foo/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:80/namespace/foo/',
                    'urls': [
                        'http://localhost:80/namespace/foo/',
                    ],
                })

                result = deserialize('localhost:3000/namespace')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:3000/namespace',
                    'urls': [
                        'http://localhost:3000/namespace',
                    ],
                })

                result = deserialize('localhost:3000/namespace/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:3000/namespace/',
                    'urls': [
                        'http://localhost:3000/namespace/',
                    ],
                })

                result = deserialize('localhost:3000/namespace/foo')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:3000/namespace/foo',
                    'urls': [
                        'http://localhost:3000/namespace/foo',
                    ],
                })

                result = deserialize('localhost:3000/namespace/foo/')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:3000/namespace/foo/',
                    'urls': [
                        'http://localhost:3000/namespace/foo/',
                    ],
                })
            })

            test(`${deserializerKey}: begins with \`host\` - multiple hosts`, async () => {
                result = deserialize('localhost,foohost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize('localhost,foohost/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize('localhost:3000,foohost:4000')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000,foohost:4000/',
                    'urls': [
                        'http://localhost:3000/',
                        'http://foohost:4000/',
                    ],
                })

                result = deserialize('localhost:3000,foohost:4000/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000,foohost:4000/',
                    'urls': [
                        'http://localhost:3000/',
                        'http://foohost:4000/',
                    ],
                })

                result = deserialize('localhost,foohost/namespace')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:80,foohost:80/namespace',
                    'urls': [
                        'http://localhost:80/namespace',
                        'http://foohost:80/namespace',
                    ],
                })

                result = deserialize('localhost,foohost/namespace/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:80,foohost:80/namespace/',
                    'urls': [
                        'http://localhost:80/namespace/',
                        'http://foohost:80/namespace/',
                    ],
                })

                result = deserialize('localhost,foohost/namespace/foo')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:80,foohost:80/namespace/foo',
                    'urls': [
                        'http://localhost:80/namespace/foo',
                        'http://foohost:80/namespace/foo',
                    ],
                })

                result = deserialize('localhost,foohost/namespace/foo/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:80,foohost:80/namespace/foo/',
                    'urls': [
                        'http://localhost:80/namespace/foo/',
                        'http://foohost:80/namespace/foo/',
                    ],
                })

                result = deserialize('localhost:3000,foohost:4000/namespace')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:3000,foohost:4000/namespace',
                    'urls': [
                        'http://localhost:3000/namespace',
                        'http://foohost:4000/namespace',
                    ],
                })

                result = deserialize('localhost:3000,foohost:4000/namespace/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'http://localhost:3000,foohost:4000/namespace/',
                    'urls': [
                        'http://localhost:3000/namespace/',
                        'http://foohost:4000/namespace/',
                    ],
                })

                result = deserialize('localhost:3000,foohost:4000/namespace/foo')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:3000,foohost:4000/namespace/foo',
                    'urls': [
                        'http://localhost:3000/namespace/foo',
                        'http://foohost:4000/namespace/foo',
                    ],
                })

                result = deserialize('localhost:3000,foohost:4000/namespace/foo/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'http://localhost:3000,foohost:4000/namespace/foo/',
                    'urls': [
                        'http://localhost:3000/namespace/foo/',
                        'http://foohost:4000/namespace/foo/',
                    ],
                })
            })

            test(`${deserializerKey}: begins with \`auth\``, async () => {
                result = deserialize('@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize(':@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize(`${username}@localhost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                    ],
                })

                result = deserialize(`${username}:@localhost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                    ],
                })

                result = deserialize(`:${password}@localhost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://:${password}@localhost:80/`,
                    'urls': [
                        `http://:${password}@localhost:80/`,
                    ],
                })

                result = deserialize(`${username}:${password}@localhost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}:${password}@localhost:80/`,
                    'urls': [
                        `http://${username}:${password}@localhost:80/`,
                    ],
                })
            })

            test(`${deserializerKey}: begins with \`auth\` - multiple hosts`, async () => {
                result = deserialize('@localhost,foohost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize(':@localhost,foohost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize(`${username}@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                        `http://${username}@foohost:80/`,
                    ],
                })

                result = deserialize(`${username}:@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                        `http://${username}@foohost:80/`,
                    ],
                })

                result = deserialize(`:${password}@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://:${password}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://:${password}@localhost:80/`,
                        `http://:${password}@foohost:80/`,
                    ]
                })

                result = deserialize(`${username}:${password}@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}:${password}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://${username}:${password}@localhost:80/`,
                        `http://${username}:${password}@foohost:80/`,
                    ],
                })
            })

            test.skip(`${deserializerKey}: begins with \`protocol\``, async () => {
                result = deserialize('http://localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('http://localhost/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('http://localhost:3000')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000/',
                    'urls': [
                        'http://localhost:3000/',
                    ],
                })

                result = deserialize('http://localhost:3000/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000/',
                    'urls': [
                        'http://localhost:3000/',
                    ],
                })

                result = deserialize('https://localhost:3000')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,
                    'namespace': undefined,

                    'url': 'https://localhost:3000/',
                    'urls': [
                        'https://localhost:3000/',
                    ],
                })

                result = deserialize('https://localhost:3000/')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'https://localhost:3000/',
                    'urls': [
                        'https://localhost:3000/',
                    ],
                })

                result = deserialize('https://localhost:3000/namespace')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'https://localhost:3000/namespace',
                    'urls': [
                        'https://localhost:3000/namespace',
                    ],
                })

                result = deserialize('https://localhost:3000/namespace/')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'https://localhost:3000/namespace/',
                    'urls': [
                        'https://localhost:3000/namespace/',
                    ],
                })

                result = deserialize('https://localhost:3000/namespace/foo')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'https://localhost:3000/namespace/foo',
                    'urls': [
                        'https://localhost:3000/namespace/foo',
                    ],
                })

                result = deserialize('https://localhost:3000/namespace/foo/')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 3000,
                    'ports': [3000],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'https://localhost:3000/namespace/foo/',
                    'urls': [
                        'https://localhost:3000/namespace/foo/',
                    ],
                })

                result = deserialize('http://@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('http://:@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80/',
                    'urls': [
                        'http://localhost:80/',
                    ],
                })

                result = deserialize('http://${username}@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                    ]
                })

                result = deserialize('http://${username}:@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                    ]
                })

                result = deserialize('http://:${password}@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://:${password}@localhost:80/`,
                    'urls':[
                        `http://:${password}@localhost:80/`,
                    ]
                })

                result = deserialize('http://${username}:${password}@localhost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost'],

                    'port': 80,
                    'ports': [80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}:${password}@localhost:80/`,
                    'urls': [
                        `http://${username}:${password}@localhost:80/`,
                    ]
                })

                result = deserialize('foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144/bar-baz')
                expect(result).toEqual({
                    'protocol': 'foo',
                    'auth': 'm+4.gTe~5e^(:m+4.gTe~5e^(',

                    'endpoint': 'ds143144-a0.mlab.com:43144',
                    'endpoints': ['ds143144-a0.mlab.com:43144'],

                    'host': 'ds143144-a0.mlab.com',
                    'hosts': ['ds143144-a0.mlab.com'],

                    'port': 43144,
                    'ports': [43144],

                    'path': '/bar-baz',
                    'query': {},

                    'credentials': {
                        'username': 'm+4.gTe~5e^(',
                        'password': 'm+4.gTe~5e^(',
                    },
                    'key': 'bar-baz',
                    'namespace': 'bar-baz',

                    'url': 'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144/bar-baz',
                    'urls': [
                        'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144/bar-baz',
                    ]
                })
            })

            test(`${deserializerKey}: begins with \`protocol\` - multiple hosts`, async () => {
                result = deserialize('http://localhost,foohost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize('http://localhost,foohost/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize('http://localhost:3000,foohost:4000')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000,foohost:4000/',
                    'urls': [
                        'http://localhost:3000/',
                        'http://foohost:4000/',
                    ],
                })

                result = deserialize('http://localhost:3000,foohost:4000/')
                expect(result).toEqual(                {
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:3000,foohost:4000/',
                    'urls': [
                        'http://localhost:3000/',
                        'http://foohost:4000/',
                    ],
                })

                result = deserialize('https://localhost:3000,foohost:4000')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'https://localhost:3000,foohost:4000/',
                    'urls': [
                        'https://localhost:3000/',
                        'https://foohost:4000/',
                    ],
                })

                result = deserialize('https://localhost:3000,foohost:4000/')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'https://localhost:3000,foohost:4000/',
                    'urls': [
                        'https://localhost:3000/',
                        'https://foohost:4000/',
                    ],
                })

                result = deserialize('https://localhost:3000,foohost:4000/namespace')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'https://localhost:3000,foohost:4000/namespace',
                    'urls': [
                        'https://localhost:3000/namespace',
                        'https://foohost:4000/namespace',
                    ],
                })

                result = deserialize('https://localhost:3000,foohost:4000/namespace/')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace',
                    'namespace': 'namespace',

                    'url': 'https://localhost:3000,foohost:4000/namespace/',
                    'urls': [
                        'https://localhost:3000/namespace/',
                        'https://foohost:4000/namespace/',
                    ],
                })

                result = deserialize('https://localhost:3000,foohost:4000/namespace/foo')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace/foo',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'https://localhost:3000,foohost:4000/namespace/foo',
                    'urls': [
                        'https://localhost:3000/namespace/foo',
                        'https://foohost:4000/namespace/foo',
                    ],
                })

                result = deserialize('https://localhost:3000,foohost:4000/namespace/foo/')
                expect(result).toEqual(                {
                    'protocol': 'https',
                    'auth': undefined,

                    'endpoint': 'localhost:3000',
                    'endpoints': ['localhost:3000', 'foohost:4000'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 3000,
                    'ports': [3000, 4000],

                    'path': '/namespace/foo/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': 'namespace/foo',
                    'namespace': 'namespace/foo',

                    'url': 'https://localhost:3000,foohost:4000/namespace/foo/',
                    'urls': [
                        'https://localhost:3000/namespace/foo/',
                        'https://foohost:4000/namespace/foo/',
                    ],
                })

                result = deserialize('http://@localhost,foohost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize('http://:@localhost,foohost')
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': undefined,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': 'http://localhost:80,foohost:80/',
                    'urls': [
                        'http://localhost:80/',
                        'http://foohost:80/',
                    ],
                })

                result = deserialize(`http://${username}@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                        `http://${username}@foohost:80/`,
                    ],
                })

                result = deserialize(`http://${username}:@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': undefined,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://${username}@localhost:80/`,
                        `http://${username}@foohost:80/`,
                    ],
                })

                result = deserialize(`http://:${password}@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': undefined,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://:${password}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://:${password}@localhost:80/`,
                        `http://:${password}@foohost:80/`,
                    ],
                })

                result = deserialize(`http://${username}:${password}@localhost,foohost`)
                expect(result).toEqual({
                    'protocol': 'http',
                    'auth': `${username}:${password}`,

                    'endpoint': 'localhost:80',
                    'endpoints': ['localhost:80', 'foohost:80'],

                    'host': 'localhost',
                    'hosts': ['localhost', 'foohost'],

                    'port': 80,
                    'ports': [80, 80],

                    'path': '/',
                    'query': {},

                    'credentials': {
                        'username': username,
                        'password': password,
                    },
                    'key': undefined,
                    'namespace': undefined,

                    'url': `http://${username}:${password}@localhost:80,foohost:80/`,
                    'urls': [
                        `http://${username}:${password}@localhost:80/`,
                        `http://${username}:${password}@foohost:80/`,
                    ],
                })

                result = deserialize('foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43145/bar-baz')
                expect(result).toEqual({
                    'protocol': 'foo',
                    'auth': 'm+4.gTe~5e^(:m+4.gTe~5e^(',

                    'host': 'ds143144-a0.mlab.com',
                    'port': 43144,

                    'endpoint': 'ds143144-a0.mlab.com:43144',
                    'endpoints': ['ds143144-a0.mlab.com:43144', 'ds143144-a1.mlab.com:43145'],

                    'host': 'ds143144-a0.mlab.com',
                    'hosts': ['ds143144-a0.mlab.com', 'ds143144-a1.mlab.com'],

                    'port': 43144,
                    'ports': [43144, 43145],

                    'path': '/bar-baz',
                    'query': {},

                    'credentials': {
                        'username': 'm+4.gTe~5e^(',
                        'password': 'm+4.gTe~5e^(',
                    },
                    'key': 'bar-baz',
                    'namespace': 'bar-baz',

                    'url': 'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43145/bar-baz',
                    'urls': [
                        'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144/bar-baz',
                        'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a1.mlab.com:43145/bar-baz',
                    ],
                })
            })
        }
    })

    test('pack', async () => {
        expect(uri.pack).toBeType('function')

        // @see `test_serialize`
    })

    test('unpack', async () => {
        expect(uri.unpack).toBeType('function')

        // @see `test_serialize`
    })

    test('stringify', async () => {
        expect(uri.stringify).toBeType('function')

        // @see `test_serialize`
    })

    test('parse', async () => {
        expect(uri.parse).toBeType('function')

        // @see `test_serialize`
    })

    describe('get', () => {
        expect(uri.get).toBeType('function')

        test('single host', async () => {
            let result

            result = uri.get(null)
            expect(result).toEqual(null)

            result = uri.get('/')
            expect(result).toEqual('http://localhost:80/')

            result = uri.get('localhost')
            expect(result).toEqual('http://localhost:80/')

            result = uri.get('localhost/')
            expect(result).toEqual('http://localhost:80/')

            result = uri.get('localhost:3000')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('localhost:3000/')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('http://localhost:3000')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('http://localhost:3000/')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('https://localhost:3000')
            expect(result).toEqual('https://localhost:3000/')

            result = uri.get('https://localhost:3000/')
            expect(result).toEqual('https://localhost:3000/')

            result = uri.get('/namespace')
            expect(result).toEqual('http://localhost:80/namespace')

            result = uri.get('/namespace/')
            expect(result).toEqual('http://localhost:80/namespace/')

            result = uri.get('localhost/namespace')
            expect(result).toEqual('http://localhost:80/namespace')

            result = uri.get('localhost/namespace/')
            expect(result).toEqual('http://localhost:80/namespace/')

            result = uri.get('/localhost/namespace')
            expect(result).toEqual('http://localhost:80/localhost/namespace')

            result = uri.get('/localhost/namespace/')
            expect(result).toEqual('http://localhost:80/localhost/namespace/')

            result = uri.get('localhost:3000/namespace')
            expect(result).toEqual('http://localhost:3000/namespace')

            result = uri.get('localhost:3000/namespace/')
            expect(result).toEqual('http://localhost:3000/namespace/')

            result = uri.get('http://localhost:3000')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('http://localhost:3000/')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('https://localhost:3000')
            expect(result).toEqual('https://localhost:3000/')

            result = uri.get('https://localhost:3000/')
            expect(result).toEqual('https://localhost:3000/')
        })

        test('multiple hosts', async () => {
            let result

            result = uri.get('localhost')
            expect(result).toEqual('http://localhost:80/')

            result = uri.get('localhost/')
            expect(result).toEqual('http://localhost:80/')

            result = uri.get('localhost:3000')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('localhost:3000/')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('http://localhost:3000')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('http://localhost:3000/')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('https://localhost:3000')
            expect(result).toEqual('https://localhost:3000/')

            result = uri.get('https://localhost:3000/')
            expect(result).toEqual('https://localhost:3000/')

            result = uri.get('localhost/namespace')
            expect(result).toEqual('http://localhost:80/namespace')

            result = uri.get('localhost/namespace/')
            expect(result).toEqual('http://localhost:80/namespace/')

            result = uri.get('localhost:3000/namespace')
            expect(result).toEqual('http://localhost:3000/namespace')

            result = uri.get('localhost:3000/namespace/')
            expect(result).toEqual('http://localhost:3000/namespace/')

            result = uri.get('http://localhost:3000')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('http://localhost:3000/')
            expect(result).toEqual('http://localhost:3000/')

            result = uri.get('https://localhost:3000')
            expect(result).toEqual('https://localhost:3000/')

            result = uri.get('https://localhost:3000/')
            expect(result).toEqual('https://localhost:3000/')
        })
    })

    describe('test', () => {
        expect(uri.test).toBeType('function')

        test('single host', async () => {
            let data = null
            let result

            result = uri.test(data)

            expect(result).toEqual(false)

            data = 'eyJmb28iOiBbMSwgMiwgM119'

            result = uri.test(data)

            expect(result).toEqual(false)

            data = {}

            result = uri.test(data)

            expect(result).toEqual(false)

            data = {
                'a1': {
                    'b1': {
                        'c1': [1, 2, 3],
                        'c2': 100
                    }
                },
                'a2': true,
            }

            result = uri.test(data)

            expect(result).toEqual(false)

            data = {
                'a1.b1.c1': [1, 2, 3],
                'a1.b1.c2': 100,
                'a2': true,
            }

            result = uri.test(data)

            expect(result).toEqual(false)

            data = '{"foo":[1,2,3]}'

            result = uri.test(data)

            expect(result).toEqual(false)

            data = '[{"foo":[1,2,3]}]'

            result = uri.test(data)

            expect(result).toEqual(false)

            data = '\x81\xa3foo\x93\x01\x02\x03'

            result = uri.test(data)

            expect(result).toEqual(false)

            data = 'foo:\n- 1\n- 2\n- 3'

            result = uri.test(data)

            expect(result).toEqual(false)

            // NOTE: `uri` case more verbose
            result = uri.test('/')
            expect(result).toEqual(false)

            result = uri.test('localhost')
            expect(result).toEqual(false)

            result = uri.test('localhost/')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000/')
            expect(result).toEqual(false)

            result = uri.test('http://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('http://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('/namespace')
            expect(result).toEqual(false)

            result = uri.test('/namespace/')
            expect(result).toEqual(false)

            result = uri.test('localhost/namespace')
            expect(result).toEqual(false)

            result = uri.test('localhost/namespace/')
            expect(result).toEqual(false)

            result = uri.test('/localhost/namespace')
            expect(result).toEqual(false)

            result = uri.test('/localhost/namespace/')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000/namespace')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000/namespace/')
            expect(result).toEqual(false)

            result = uri.test('http://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('http://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('http://localhost:3000/namespace')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000/namespace')
            expect(result).toEqual(true)
        })

        test('multiple hosts', async () => {
            result = uri.test('localhost')
            expect(result).toEqual(false)

            result = uri.test('localhost/')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000/')
            expect(result).toEqual(false)

            result = uri.test('http://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('http://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('localhost/namespace')
            expect(result).toEqual(false)

            result = uri.test('localhost/namespace/')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000/namespace')
            expect(result).toEqual(false)

            result = uri.test('localhost:3000/namespace/')
            expect(result).toEqual(false)

            result = uri.test('http://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('http://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('http://localhost:3000/namespace')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000/')
            expect(result).toEqual(true)

            result = uri.test('https://localhost:3000/namespace')
            expect(result).toEqual(true)
        })
    })

})
