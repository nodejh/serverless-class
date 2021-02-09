const { exec } = require("./functions/common/utils");


async function build() {
  // 清空编译目录
  await exec("rm -rf .serverless/*");

  // 编译 get_meta 函数
  await exec("mkdir -p ./.serverless/get_meta");
  await exec(`./node_modules/.bin/ncc build ./functions/get_meta/index.js -o ./.serverless/get_meta/ -e ali-oss -m`);
  await exec("cp ./ffprobe ./.serverless/get_meta/ffprobe");

}

build();
