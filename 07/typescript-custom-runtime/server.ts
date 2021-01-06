import * as http from 'http';


/**
 * 你可以在这里实现具体的业务逻辑
 */
function sayHello(name: string): string {
  return `Hello, ${name}`;
}


// 创建一个 HTTP 服务
const server = http.createServer(function (req: http.IncomingMessage, res: http.ServerResponse): void {
  // 获取 RequestId
  const requestId = req.headers["x-fc-request-id"];

  console.log(`FC Invoke Start RequestId: ${requestId}`);

  // 拼接请求参数
  let rawData = "";
  req.on('data', function (chunk) {
    rawData += chunk;
  });
  req.on('end', function () {
    
    // 处理业务逻辑，比如这里是输出欢迎语
    const body = sayHello(rawData);

    // 设置 HTTP 响应
    res.writeHead(200);
    res.end(body);
    console.log(`FC Invoke End RequestId: ${requestId}`);
  });
});

server.timeout = 0;
server.keepAliveTimeout = 0;


// 启动 HTTP 服务并监听 9000 端口
server.listen(9000, '0.0.0.0', function () {
  console.log('FunctionCompute typescript runtime initialized.');
});
