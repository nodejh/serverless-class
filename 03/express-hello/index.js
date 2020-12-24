const express = require('express')
const app = express()
const port = 3000

// 定义路由
app.get('/hello', (req, res) => {
  const { name } = req.request.query;
  res.send(`Hello ${name}!`);
});

// 启动服务
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
