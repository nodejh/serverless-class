const uuid = require("uuid");
const auth = require("../../middleware/auth");
const client = require("../../db/client");

/**
 * 获取文章详情
 * @param {string} title 文章 ID
 */
async function getArticle(article_id) {
  const res = await client.getRow(
    "article",
    {
      article_id,
    },
  );
  return res;
}

module.exports.handler = function (event, context, callback) {
  // 身份认证
  const user = auth(event);
  if (!user) {
    // 若认证失败则直接返回
    return callback("身份认证失败");
  }

  // 从 event 对象中获取文章 ID
  const article_id = JSON.parse(event.toString()).pathParameters['article_id'];
  getArticle(article_id)
    .then((detail) =>
      callback(null, {
        success: true,
        data: detail
      })
    )
    .catch((error) =>
      callback(error, {
        success: false,
        message: "查询文章失败",
      })
    );
};
