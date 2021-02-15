const { exec, getOssClient, OSS_VIDEO_NAME } = require("../common/utils");

/**
 * 获取视频元信息
 * @param {object} client OSS client
 */
async function getDuration(client) {
  const filePath = "/tmp/video.mp4";
  await client.get(OSS_VIDEO_NAME, filePath);
  const command = `./ffprobe -v quiet -show_entries format=duration -print_format json -i ${filePath}`;
  const res = await exec(command);
  return res;
}


module.exports.handler = function (event, context, callback) {
  // 获取 OSS 客户端
  const client = getOssClient(context);
  getDuration(client)
    .then((res) => {
      console.log("视频时长: \n", res);
      callback(null, res);
    })
    .catch((err) => callback(err));
};
