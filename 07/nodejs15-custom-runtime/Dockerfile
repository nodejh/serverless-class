FROM node:15.4.0-alpine3.10

# 指定工作目录
WORKDIR /usr/src/app

# 将 package.json 复制到工作目录
COPY package.json ./

# 安装依赖
RUN npm install

# 将代码复制到工作目录
COPY . .

EXPOSE 8080
# 启动应用
ENTRYPOINT [ "node", "server.js" ]