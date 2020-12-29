const addon = require('./build/Release/hello.node'); // 如果 VS 编译模式是 Release


module.exports.handler = function (event, context, callback) {
    const gretting = addon.hello()
    console.log(gretting);
    callback(null, gretting);
};