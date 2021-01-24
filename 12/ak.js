/**
 * 使用固定访问凭证
 */
const accessKeyId = 'xxx';
const accessKeySecret = 'xxx';

module.exports.handler = function (event, context, callback) {

    // 初始化 OSS 客户端
    const store = oss({
        accessKeyId,
        accessKeySecret,
        stsToken: securityToken,
        bucket: 'role-test',
        region: 'oss-cn-beijing'
    });

    // 获取文件
    const result = await store.get('hello.txt');
    return result.content.toString();
};