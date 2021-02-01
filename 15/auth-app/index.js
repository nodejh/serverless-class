const proxy = require('@webserverless/fc-express')
const express = require('express');
const bodyParser = require('body-parser');
const TableStore = require('tablestore');
const jwt = require('jsonwebtoken');
const {
  json
} = require('body-parser');

// 设置密钥，非常重要，不能泄漏
const SECRET = 'token_secret_xd2dasf19df='
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// 初始化 TableStore client
const client = new TableStore.Client({
  accessKeyId: '<your access key>',
  accessKeySecret: '<your access secret>',
  endpoint: 'https://serverless-app.cn-shanghai.ots.aliyuncs.com',
  instancename: 'serverless-app',
});


// 定义 / 路由，返回 Hello Serverless!
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: 'Hello Serverless!',
  });
});


// 定义 /register 路由，处理注册请求
app.post('/register', async (req, res) => {
  // 从请求体中获取用户信息
  const name = req.body.name;
  const password = req.body.password;
  const age = req.body.age;

  // 判断用户是否已经存在
  const {
    row
  } = await client.getRow({
    tableName: "user",
    primaryKey: [{
      name
    }]
  });
  if (row.primaryKey) {
    // 如果用户已存在，则直接返回
    return res.json({
      success: false,
      message: '用户已存在'
    });
  }

  // 创建用户，将用户信息写入到表格存储中
  await client.putRow({
    tableName: "user",
    condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST, null),
    primaryKey: [{
      name
    }],
    attributeColumns: [{
      password
    }, {
      age
    }]
  });
  // 返回创建成功
  return res.send({
    success: true,
  });
});


// 定义 /login 路由，用来实现登录功能
app.post('/login', async (req, res) => {
  // 从请求体中获取用户名和密码
  const name = req.body.name;
  const password = req.body.password;

  // 根据用户名查询用户信息
  const {
    row
  } = await client.getRow({
    tableName: 'user',
    primaryKey: [{
      name
    }]
  })

  // 如果查询结果为空，则直接返回用户不存在
  if (!row.primaryKey) {
    return res.json({
      success: false,
      message: '用户不存在'
    })
  }

  // 从查询结果中构造用户信息
  const user = {
    name
  };
  row.attributes.forEach(item => user[item.columnName] = item.columnValue);

  // 判断密码是否正确
  if (password !== user.password) {
    return res.json({
      success: false,
      message: '密码错误'
    })
  }

  user.password = '******';

  /**
   * 生成 token
   * jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
   */
  const token = jwt.sign(user, SECRET)
  return res.json({
    success: true,
    data: {
      token
    }
  })
});


// 定义 /user 路由，获取当前登录的用户信息
app.get('/user', (req, res) => {
  // 从 HTTP 请求头中获取 token 信息
  const token = req
    .headers
    .authorization
    .split(' ')
    .pop();

  try {
    // 验证 token 并解析出用户信息
    const user = jwt.verify(token, SECRET);
    return res.json({
      success: true,
      data: user
    })

  } catch (error) {
    return res.json({
      success: false,
      data: '身份认证失败'
    })
  }
});


const server = new proxy.Server(app);

module.exports.handler = function (req, res, context) {
  // 使用 @webserverless/fc-express 来将函数计算的请求转发给 Express.js 应用
  // @webserverless/fc-express 可以将函数参数转换为 Express.js 的路由参数
  server.httpProxy(req, res, context);
};