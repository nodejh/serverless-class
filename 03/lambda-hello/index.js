exports.handler = (event, context, callback) => {
  // 从 event 中获取 URL query 参数
  const {name} = event.queryStringParameters;
  // 定义 HTTP Response
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message: `Hello ${name}!`}),
  };
  callback(null, response);
};
