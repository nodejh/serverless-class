const child_process = require("child_process");
const oss = require("ali-oss");

const OSS_BUCKET_NAME = "fc-test-video";
const OSS_VIDEO_NAME = "SampleVideo_1280x720_30mb.mp4";
const OSS_REGION = "oss-cn-beijing";

/**
 * 运行 Linux 命令
 * @param {string} command 待运行的命令
 */
async function exec(command) {
  console.log(command)
  return new Promise((resolve, reject) => {
    child_process.exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return reject(err);
      }

      if (stderr) {
        console.error(stderr)
        return reject(stderr);
      }
      console.log(stdout)
      return resolve(stdout);
    });
  });
}

/**
 * 获取 OSS Client
 * @param {object} context 函数上下文
 */
function getOssClient(context) {
  // 获取函数计算的临时访问凭证
  const accessKeyId = context.credentials.accessKeyId;
  const accessKeySecret = context.credentials.accessKeySecret;
  const securityToken = context.credentials.securityToken;

  // 初始化 OSS 客户端
  const client = oss({
    accessKeyId,
    accessKeySecret,
    stsToken: securityToken,
    bucket: OSS_BUCKET_NAME,
    region: OSS_REGION,
  });

  return client;
}

module.exports = {
  exec,
  getOssClient,
  OSS_VIDEO_NAME,
};
