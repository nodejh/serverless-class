const assert = require("assert");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../../config");
const client = require("../../db/client");

/**
 * 用户登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
async function login(username, password) {
  const user = await client.getRow("user", { username });
  assert(user && user.password === password);
  const token = jwt.sign({ username: user.username }, jwt_secret);
  return token;
}

module.exports.handler = function (event, context, callback) {
  const body = JSON.parse(JSON.parse(event.toString()).body);
  const { username, password } = body;

  login(username, password)
    .then((token) => callback(null, { success: true, data: { token } }))
    .catch((error) =>
      callback(error, { success: false, message: "用户登录失败" })
    );
};
