const auth = require("../../middleware/auth");
const client = require("../../db/client");

/**
 * 更新文章
 * @param {string} article_id 待更新的文章 ID
 * @param {string} title 文章标题
 * @param {string} content 文章内容
 */
async function updateArticle(article_id, title, content) {
  const now = new Date().toLocaleString();
  await client.updateRow(
    "article",
    {
      article_id,
    },
    {
      title,
      content,
      update_date: now,
    }
  );
}

module.exports.handler = function (event, context, callback) {
  // 身份认证
  const user = auth(event);
  if (!user) {
    // 若认证失败则直接返回
    return callback("身份认证失败");
  }

  const eventObject = JSON.parse(event.toString())
  // 从 event 对象的 pathParameters 中获取 Path 参数
  const article_id = eventObject.pathParameters['article_id'];
  const body = JSON.parse(eventObject.body);
  // 从 event 对象的 body 中获取请求体参数
  const { title, content } = body;

  updateArticle(article_id, title, content)
    .then(() =>
      callback(null, {
        success: true,
      })
    )
    .catch((error) =>
      callback(error, {
        success: false,
        message: "更新文章失败",
      })
    );
};
