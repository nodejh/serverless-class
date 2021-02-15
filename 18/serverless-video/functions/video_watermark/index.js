const { exec, getOssClient, OSS_VIDEO_NAME } = require("../common/utils");



/**
 * 为视频添加水印
 * @param {object} client OSS client
 */
async function watermark(client) {
  const watermark = './watermark.gif'
  const filePath = "/tmp/video.mp4";
  const outPath = "/tmp/out.mp4";
  const OSS_WATERMARK_VIDEO_NAME = '带水印的视频.mp4';
  // 下载视频到本地
  await client.get(OSS_VIDEO_NAME, filePath);
  // 在视频右下角的添加图片水印
  const command = `./ffmpeg -hide_banner -loglevel warning -i ${filePath} -i ${watermark} -filter_complex 'overlay=main_w-overlay_w-10:main_h-overlay_h-10' ${outPath}`;
  await exec(command);
  // 上传处理后的视频到 OSS
  await client.put(OSS_WATERMARK_VIDEO_NAME, outPath)
}


module.exports.handler = function (event, context, callback) {
  const client = getOssClient(context);
  watermark(client)
    .then(() => {
      callback(null, "为视频添加水印成功");
    })
    .catch((err) => callback(err));
};
