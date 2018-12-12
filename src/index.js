"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var port = process.env.port || 1337;
app_1["default"].listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log('server is listining on port ' + port);
});
