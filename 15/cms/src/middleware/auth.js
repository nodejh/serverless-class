const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/index");

const auth = function (event) {
  try {
    const token = event.headers.Authorization.split(" ").pop();
    // 验证 token 并解析出用户信息
    const user = jwt.verify(token, jwt_secret);
    return user;
  } catch (error) {
    return false;
  }
};

module.exports = auth;
