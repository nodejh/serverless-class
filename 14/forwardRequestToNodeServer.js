function forwardRequestToNodeServer(server, event, context, resolver) {
  try {
    // 将 API 网关事件转换为 HTTP Request
    const requestOptions = mapApiGatewayEventToHttpRequest(
      event,
      context,
      getSocketPath(server.socketPathSuffix)
    );
    // 将 HTTP 请求转发到 Node.js Server
    const req = http.request(requestOptions, (response) =>
      forwardResponseToApiGateway(server, response, resolver)
    );

    req
      .on("error", (error) => {
        // 处理异常
        return forwardLibraryErrorResponse(error, resolver);
      })
      .end();
  } catch (error) {
    // 处理异常
    return forwardLibraryErrorResponse(error, resolver);
  }
}
