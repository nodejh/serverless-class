const {
  exec
} = require("./functions/common/utils");


async function build() {
  // 清空编译目录
  await exec("rm -rf .serverless/*");

  // 编译 get_duration 函数
  await exec("mkdir -p ./.serverless/get_duration");
  await exec(`ncc build ./functions/get_duration/index.js -o ./.serverless/get_duration/ -e ali-oss`);
  await exec("cp ./ffprobe ./.serverless/get_duration/ffprobe");


  // 编译 get_meta 函数
  await exec("mkdir -p ./.serverless/get_meta");
  await exec(`ncc build ./functions/get_meta/index.js -o ./.serverless/get_meta/ -e ali-oss`);
  await exec("cp ./ffprobe ./.serverless/get_meta/ffprobe");


  // 编译 get_video_gif 函数
  await exec("mkdir -p ./.serverless/get_video_gif");
  await exec(`ncc build ./functions/get_video_gif/index.js -o ./.serverless/get_video_gif/ -e ali-oss`);
  await exec("cp ./ffmpeg ./.serverless/get_video_gif/ffmpeg");


  // 编译 video_watermark 函数
  await exec("mkdir -p ./.serverless/video_watermark");
  await exec(`ncc build ./functions/video_watermark/index.js -o ./.serverless/video_watermark/ -e ali-oss`);
  await exec("cp ./functions/video_watermark/watermark.gif ./.serverless/video_watermark/watermark.gif");
  await exec("cp ./ffmpeg ./.serverless/video_watermark/ffmpeg");


  // 编译 video_transcode 函数
  await exec("mkdir -p ./.serverless/video_transcode");
  await exec(`ncc build ./functions/video_transcode/index.js -o ./.serverless/video_transcode/ -e ali-oss`);
  await exec("cp ./ffmpeg ./.serverless/video_transcode/ffmpeg");
}

build();