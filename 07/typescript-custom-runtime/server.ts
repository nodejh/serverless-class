import * as http from 'http';
// import { sayHello } from './src/user'

const server = http.createServer(function (req: http.IncomingMessage, res: http.ServerResponse): void {
  const requestId = req.headers["x-fc-request-id"];
  console.log(`FC Invoke Start RequestId: ${requestId}`);
  let rawData = "";
  req.on('data', function (chunk) {
    rawData += chunk;
  });
  req.on('end', function () {
    
    const body = `Hello, ${rawData}`;

    res.writeHead(200);
    res.end(body);
    console.log(`FC Invoke End RequestId: ${requestId}`);
  });
});

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // kee palive, never timeout

server.listen(9000, '0.0.0.0', function () {
  console.log('FunctionCompute typescript runtime initialized.');
});
