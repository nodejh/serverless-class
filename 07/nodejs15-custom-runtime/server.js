
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

// HTTP 触发器
const app = express();
app.get('/*', (req, res) => {
  res.send(`Hello Serverless! This is HTTP function. Node.js version: ${process.version}. \n`);
});

// 事件触发器
app.post('/invoke', (req, res) => {
  res.send(`Hello Serverless! This event function. Node.js version: ${process.version}. \n`);
});

var server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // keepalive, never timeout