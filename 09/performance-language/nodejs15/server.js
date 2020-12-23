const express = require('express');
const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

// HTTP 触发器
app.get('/*', (req, res) => {
  res.send('Hello FunctionCompute, http function\n');
});

// 事件触发器
app.post('/invoke', (req, res) => {
  res.send('Hello Serverless! event function\n');
});

var server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // keepalive, never timeout
