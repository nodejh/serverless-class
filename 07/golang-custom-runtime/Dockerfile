FROM golang:1.15.6-alpine3.12

# 指定工作目录
WORKDIR /go/src/app

# 将代码复制到工作目录
COPY . .
# 编译
RUN go build main.go
# 暴露 8080 端口
EXPOSE 8080
# 启动应用
ENTRYPOINT [ "./main" ]