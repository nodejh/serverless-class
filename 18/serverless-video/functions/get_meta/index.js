const { exec, getOssClient, OSS_VIDEO_NAME } = require("../common/utils");

async function getMeta(client) {
  const filePath = "/tmp/video.mp4";
  await client.get(OSS_VIDEO_NAME, filePath);
  const command = `ffprobe -v quiet -show_format -show_streams -print_format json -i ${filePath}`;
  const res = await exec(command);
  return res;
}

module.exports.handler = function (event, context, callback) {
  const client = getOssClient(context);
  getMeta(client)
    .then((res) => {
      console.log("视频元信息: \n", res);
      callback(null, res);
    })
    .catch((err) => callback(err));
};
