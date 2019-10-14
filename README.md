
# `js-connection-uri` [![NPM version](https://badge.fury.io/js/%40grimen%2Fmybad.svg)](https://badge.fury.io/js/%40grimen%2Fmybad) [![Build Status](https://travis-ci.com/grimen/js-connection-uri.svg?token=sspjPRWbecBSpceU8Jyn&branch=master)](https://travis-ci.com/grimen/js-connection-uri) [![Coverage Status](https://codecov.io/gh/grimen/js-connection-uri/branch/master/graph/badge.svg)](https://codecov.io/gh/grimen/js-connection-uri)

*A robust connection URI parser/stringifier - for JavaScript/Node.*


## Introduction

This connection URI library was implemented in lack of robust JavaScript/Node.js alternatives. This one supports absolute/relative multi-host connection URIs with smart fallbacks.


## Install

Install using **npm**:

```bash
$ npm install @grimen/connection-uri
```

Install using **yarn**:

```bash
$ yarn add @grimen/connection-uri
```


## Use

Very basic **[example](https://github.com/grimen/js-connection-uri/tree/master/examples/basic.js)**:

```javascript
const connectionURI = require('@grimen/connection-uri')

basicConnectionURI = 'localhost:3000/namespace/foo/'
basicConnectionOptions = connectionURI.unpack(basicConnectionURI)

console.log(`\n\`connectionURI.unpack("${basicConnectionURI}")\`\n\nRESULT:`, basicConnectionOptions, '\n')
//
// {
//     'protocol': 'http',
//     'auth': None,
//
//     'endpoint': 'localhost:3000',
//     'endpoints': ['localhost:3000'],
//
//     'host': 'localhost',
//     'hosts': ['localhost'],
//
//     'port': 3000,
//     'ports': [3000],
//
//     'path': '/namespace/foo/',
//     'query': {},
//
//     'credentials': {
//         'username': None,
//         'password': None,
//     },
//     'key': 'namespace/foo',
//     'namespace': 'namespace/foo',
//
//     'url': 'http://localhost:3000/namespace/foo/',
//     'urls': [
//         'http://localhost:3000/namespace/foo/'
//     ],
// }
//

basicConnectionURI = connectionURI.pack(basicConnectionOptions)

console.log(`\n\`connectionURI.pack(${JSON.stringify(basicConnectionOptions)})\`\n\nRESULT:`, JSON.stringify(basicConnectionURI), '\n')
//
// 'http://localhost:3000/namespace/foo/'
//

complexMultihostURI = 'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43145/bar-baz'
complexMultihostOptions = connectionURI.unpack(complexMultihostURI)

console.log(`\n\`connectionURI.unpack("${complexMultihostURI}")\`\n\nRESULT:`, complexMultihostOptions, '\n')
//
// {
//     'protocol': 'foo',
//     'auth': 'm+4.gTe~5e^(:m+4.gTe~5e^(',
//
//     'host': 'ds143144-a0.mlab.com',
//     'port': 43144,
//
//     'endpoint': 'ds143144-a0.mlab.com:43144',
//     'endpoints': ['ds143144-a0.mlab.com:43144', 'ds143144-a1.mlab.com:43145'],
//
//     'host': 'ds143144-a0.mlab.com',
//     'hosts': ['ds143144-a0.mlab.com', 'ds143144-a1.mlab.com'],
//
//     'port': 43144,
//     'ports': [43144, 43145],
//
//     'path': '/bar-baz',
//     'query': {},
//
//     'credentials': {
//         'username': 'm+4.gTe~5e^(',
//         'password': 'm+4.gTe~5e^(',
//     },
//     'key': 'bar-baz',
//     'namespace': 'bar-baz',
//
//     'url': 'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43145/bar-baz',
//     'urls': [
//         'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144/bar-baz',
//         'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a1.mlab.com:43145/bar-baz'
//     ],
// }
//

complexMultihostURI = connectionURI.pack(complexMultihostOptions)

console.log(`\n\`connectionURI.pack(${JSON.stringify(complexMultihostOptions)})\`\n\nRESULT:`, JSON.stringify(complexMultihostURI), '\n')
//
// 'foo://m+4.gTe~5e^(:m+4.gTe~5e^(@ds143144-a0.mlab.com:43144,ds143144-a1.mlab.com:43145/bar-baz'
//

// NOTE: see tests for more advanced examples, e.g. the library handles absolute and relative URIs, etc.

```


## Test

Clone down source code:

```sh
$ make install
```

Run **colorful tests** using **jest**:

```sh
$ make test
```


## Related

- [**`python-connection-uri`**](https://github.com/grimen/python-connection-uri) - *"A robust connection URI parser/stringifier - for Python"*


## About

This project was mainly initiated - in lack of solid existing alternatives - to be used at our work at **[Markable.ai](https://markable.ai)** to have common code conventions between various programming environments where **Node.js** (for I/O heavy operations) is heavily used.


## License

Released under the MIT license.
