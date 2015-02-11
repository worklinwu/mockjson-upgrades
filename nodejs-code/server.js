/**
 * author : linwu (http://www.linwu.name/)
 * mockjson-node 使用案例
 */

var http = require('http');
var urllib = require('url');
var mockJson = require('./mockjson-node');
var port = 5405;

// mockJSON 配置
mockJson(/test/,{
    "test-result|5-20":"@NUMBER"
});

http.createServer(function (req, res) {
    var params = urllib.parse(req.url, true);
    var param_tpl;
    var param_delay;
    var param_data;
    var param_callback;
    var result = "";


    if (params.query) {
        param_tpl = params.query.tpl ? params.query.tpl : null;
        param_delay = params.query.delay && typeof params.query.delay == "number" ? parseInt(params.query.delay) : 0;
        param_data = params.query.data;
        param_callback = params.query.callback;

        try{
            if (typeof param_data === "string") {
                param_data = JSON.parse(param_data);
            }

            // 解析数据
            result = JSON.stringify(mockJson.parse(param_tpl, param_data));
            // 包装成jsonp
            if (param_callback) {
                result = param_callback + '(' + result + ')';
            }
            delay(param_delay);
        }catch (e){
            result = "格式出错!";
        }
    }

    res.end(result);

}).listen(port, function () {
    console.log('server is listening on port ' + port);
});

/**
 * 模拟延迟
 * @param milliSeconds
 */
function delay(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}