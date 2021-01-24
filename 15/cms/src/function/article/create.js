const uuid = require("uuid");
const auth = require("../../middleware/auth");
const client = require("../../db/client");

/**
 * 创建文章
 * @param {string} username 用户名
 * @param {string} title 文章标题
 * @param {string} content 文章内容
 */
async function createArticle(username, title, content) {
  const article_id = uuid.v4();
  const now = new Date().toLocaleString();
  await client.createRow(
    "article",
    {
      article_id,
    },
    {
      username,
      title,
      content,
      create_date: now,
      update_date: now,
    }
  );
  return article_id;
}

module.exports.handler = function (event, context, callback) {
  // 身份认证
  const user = auth(event);
  if (!user) {
    // 若认证失败则直接返回
    return callback("身份认证失败");
  }
  // 从 user 中获取 username
  const { username } = user;

  const body = JSON.parse(JSON.parse(event.toString()).body);
  const { title, content } = body;

  createArticle(username, title, content)
    .then((article_id) =>
      callback(null, {
        success: true,
        data: { article_id }
      })
    )
    .catch((error) =>
      callback(error, {
        success: false,
        message: "创建文章失败",
      })
    );
};
