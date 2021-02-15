const { exec, getOssClient, OSS_VIDEO_NAME } = require("../common/utils");



/**
 * 将视频转换为 H.265 编码
 * @param {object} client OSS client
 */
async function watermark(client) {
  const filePath = "/tmp/video.mp4";
  const outPath = "/tmp/out.mp4";
  const OSS_NAME = '转换后的视频.mp4';
  // 下载视频到本地
  await client.get(OSS_VIDEO_NAME, filePath);
  // 将视频转换为 H.265 编码
  const command = `./ffmpeg -hide_banner -loglevel warning -i ${filePath} -c:v libx265 -x265-params log-level=error ${outPath}`;
  await exec(command);
  // 上传处理后的视频到 OSS
  await client.put(OSS_NAME, outPath)
}


module.exports.handler = function (event, context, callback) {
  const client = getOssClient(context);
  watermark(client)
    .then(() => {
      callback(null, "转码成功");
    })
    .catch((err) => callback(err));
};
