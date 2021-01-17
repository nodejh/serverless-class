const proxy = require('@webserverless/fc-express')
const express = require('express');

const app = express();


// 定义 / 路由，返回 Hello Serverless!
app.get('/', (req, res) => {
    res.json({
        success: true,
        data: 'Hello Serverless!',
    });
});



const server = new proxy.Server(app);

module.exports.handler = function (req, res, context) {
    // 使用 @webserverless/fc-express 来将函数计算的请求转发给 Express.js 应用
    // @webserverless/fc-express 可以将函数参数转换为 Express.js 的路由参数
    server.httpProxy(req, res, context);
};