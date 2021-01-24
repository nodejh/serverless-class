const client = require("../../db/client");

/**
 * 用户注册
 * @param {string} username 用户名
 * @param {string} password 密码
 */
async function register(username, password) {
  await client.createRow("user", { username }, { password });
}

module.exports.handler = function (event, context, callback) {
  const body = JSON.parse(JSON.parse(event.toString()).body);
  const { username, password } = body;

  register(username, password)
    .then(() => callback(null, { success: true }))
    .catch((error) =>
      callback(error, { success: false, message: "用户注册失败" })
    );
};
