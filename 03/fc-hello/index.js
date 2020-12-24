exports.handler = (request, response, context) => {
  // 从 request 中获取
  const {name} = request.queries;
  // 设置 HTTP 响应
  response.setStatusCode(200);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({message: `Hello, ${name}!`}));
};
