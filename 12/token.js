/**
 * 使用临时访问凭证
 */

module.exports.handler = function (event, context, callback) {
    // 获取函数计算的临时访问凭证
    const accessKeyId = context.credentials.accessKeyId;
    const accessKeySecret = context.credentials.accessKeySecret;
    const securityToken = context.credentials.securityToken;

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