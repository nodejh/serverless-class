const FCClient = require('@alicloud/fc2');




async function invoke(client, serviceName, functionName) {
  try {
    const res = await client.invokeFunction(serviceName, functionName, null);
    console.log('invoke function: %j', res);
  } catch (err) {
    console.error('invoke error', err);
  }
}


async function main(account, region, credentials) {
  const serviceName = 'serverless';
  const client = new FCClient(account, {
    region,
    accessKeyID: credentials.accessKeyId,
    accessKeySecret: credentials.accessKeySecret,
    securityToken: credentials.securityToken,
  });
  const functions = [
    'performance-java8',
    'performance-nodejs10',
    'performance-nodejs12',
    'performance-nodejs15',
    'performance-python3',
    'performance-golang',
    'performance-php',

    'performance-java8-1024',
    'performance-nodejs10-1024',
    'performance-nodejs12-1024',
    'performance-nodejs15-1024',
    'performance-python3-1024',
    'performance-golang-1024',
    'performance-php-1024',

    'performance-java8-3008',
    'performance-nodejs10-3008',
    'performance-nodejs12-3008',
    'performance-nodejs15-3008',
    'performance-python3-3008',
    'performance-golang-3008',
    'performance-php-3008',
  ];

  const list = functions.map(name => invoke(client, serviceName, name));
  await Promise.all(list);
}


exports.handler = function(event, context, callback) {
  const account = context.accountId;
  const region = context.region;
  const credentials = context.credentials;

  main(account, region, credentials)
  .then(() => callback(null, 'done')).catch(callback);
};  