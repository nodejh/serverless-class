function createServer(requestListener, serverListenCallback) {
    // 创建一个自定义 HTTP 服务（Node.js Server）
    const server = http.createServer(requestListener);

    // 生成一个 Unix Domain Socket
    server.socketPathSuffix = getRandomString();

    server.on("listening", () => {
        server.isListening = true;
        if (serverListenCallback) serverListenCallback();
    });

    server
        .on("close", () => {
            server.isListening = false;
        })
        .on("error", (error) => {
            // 异常处理，例如判读 socket 是否已被监听
        });

    // 监听 Unix Domain Socket，启动 HTTP 服务（Node.js Server）
    server.listen(`/tmp/server-${server.socketPathSuffix}.sock`);
    return server;
}