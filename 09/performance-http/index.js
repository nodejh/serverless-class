const getRawBody = require('raw-body');
const getFormBody = require('body/form');
const body = require('body');


module.exports.handler = function(req, resp, context) {
    console.log('hello world');

    const params = {
        path: req.path,
        queries: req.queries,
        headers: req.headers,
        method : req.method,
        requestURI : req.url,
        clientIP : req.clientIP,
        requestId: context.requestId,
    }
        
    getRawBody(req, function(err, body) {
        resp.setHeader('content-type', 'text/plain');

        for (var key in req.queries) {
          var value = req.queries[key];
          resp.setHeader(key, value);
        }
        params.body = body.toString();
        resp.send(JSON.stringify(params, null, '    '));
    }); 
}