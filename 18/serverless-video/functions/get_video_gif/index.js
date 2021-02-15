const { exec, getOssClient, OSS_VIDEO_NAME } = require("../common/utils");

const GIF_NAME = "视频封面.gif";


/**
 * 截取视频 GIF 图
 * @param {object} client OSS client
 * @param {number} startTime 截取 GIF 的开始时间
 * @param {endTime} client 截取 GIF 的开始时间
 */
async function getVideoGIF(client, startTime = 0, endTime = 2) {
  const filePath = "/tmp/video.mp4";
  const gifPath = "/tmp/out.gif";
  // 下载视频到本地
  await client.get(OSS_VIDEO_NAME, filePath);
  // 截取视频 GIF 图
  const command = `./ffmpeg -hide_banner -loglevel warning -i ${filePath} -ss ${startTime} -to ${endTime} -s 640x320 -r 15 -f gif ${gifPath}`;
  await exec(command);
  // 上传 GIF 图到 OSS
  await client.put(GIF_NAME, gifPath)
}


module.exports.handler = function (event, context, callback) {
  const client = getOssClient(context);
  getVideoGIF(client)
    .then(() => {
      callback(null, "截取视频 GIF 图成功");
    })
    .catch((err) => callback(err));
};
