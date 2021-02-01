function forwardResponseToApiGateway(server, response, resolver) {
  const buf = [];
  response
    .on("data", (chunk) => buf.push(chunk))
    .on("end", () => {
      // 根据 response 构造函数 callback 参数数据
      const data = {
        statusCode: response.statusCode,
        body: Buffer.concat(buf),
        headers: getResponseHeaders(response),
        isBase64Encoded: isContentTypeBinaryMimeType(response),
      };
      // 返回 callback 参数
      resolver(data);
    });
}
