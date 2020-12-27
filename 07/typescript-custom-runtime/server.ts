import * as http from 'http';

function sayHello(name: string): string {
  return `Hello, ${name}`;
}

const server = http.createServer(function (req: http.IncomingMessage, res: http.ServerResponse): void {
  const requestId = req.headers["x-fc-request-id"];
  console.log(`FC Invoke Start RequestId: ${requestId}`);
  let rawData = "";
  req.on('data', function (chunk) {
    rawData += chunk;
  });
  req.on('end', function () {
    
    // 处理业务逻辑，比如这里是输出欢迎语
    const body = sayHello(rawData);

    res.writeHead(200);
    res.end(body);
    console.log(`FC Invoke End RequestId: ${requestId}`);
  });
});

server.timeout = 0;
server.keepAliveTimeout = 0;

server.listen(9000, '0.0.0.0', function () {
  console.log('FunctionCompute typescript runtime initialized.');
});
