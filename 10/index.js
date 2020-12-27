const Core = require('@alicloud/pop-core');
const oss = require('ali-oss');


/**
 * 角色扮演
 * @param {string} accessKeyId 
 * @param {string} accessKeySecret 
 * @param {string} securityToken 
 */
async function assumeRole(accessKeyId, accessKeySecret, securityToken) {
    // 构建一个阿里云客户端, 用于发起请求
    const client = new Core({
        accessKeyId,
        accessKeySecret,
        securityToken,
        endpoint: 'https://sts.aliyuncs.com',
        apiVersion: '2015-04-01'
    });

    //设置参数
    const params = {
        "RegionId": "cn-hangzhou",
        // 需要扮演的账号 B 的角色
        "RoleArn": "acs:ram::1676314257720940:role/roleforaccounta",
        "RoleSessionName": "TestAssumeRole"
    }

    const requestOption = {
        method: 'POST'
    };

    // 发起角色扮演请求
    const result = await client.request('AssumeRole', params, requestOption);
    // 返回角色扮演后的临时访问凭证
    return {
        accessKeyId: result.Credentials.AccessKeyId,
        accessKeySecret: result.Credentials.AccessKeySecret,
        securityToken: result.Credentials.SecurityToken,

    };
}


/**
 * 获取账号 B 中的 OSS 文件
 * @param {string} accessKeyId 
 * @param {string} accessKeySecret 
 * @param {string} securityToken 
 */
async function getObject(accessKeyId, accessKeySecret, securityToken) {
    // 构建 OSS 客户端
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
}


module.exports.handler = function (event, context, callback) {
    // 获取函数计算的临时访问凭证
    const accessKeyId = context.credentials.accessKeyId;
    const accessKeySecret = context.credentials.accessKeySecret;
    const securityToken = context.credentials.securityToken;

    assumeRole(accessKeyId, accessKeySecret, securityToken)
        .then(res => getObject(res.accessKeyId, res.accessKeySecret, res.securityToken))
        .then(data => {
            console.log('data: ', data);
            callback(null, data);
        })
        .catch(error => console.log(error))
        ;

};