

// =========================================
//       EXAMPLE
// --------------------------------------

const connectionURI = require('..')

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
