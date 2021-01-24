const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/index");

/**
 * 身份认证
 * @param {object} event API 网关的 event 对象
 * @return {object} 认证通过后返回 user 信息；认证失败则返回 false
 */
const auth = function (event) {
  try {
    const data = JSON.parse(event.toString());
    if (data.headers && data.headers.Authorization) {
      const token = JSON.parse(event.toString())
        .headers.Authorization.split(" ")
        .pop();
      const user = jwt.verify(token, jwt_secret);
      return user;
    }
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = auth;
