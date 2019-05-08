"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var body_parser_1 = require("body-parser");
var dotenv_1 = require("dotenv");
dotenv_1.config();
var app = express();
exports.app = app;
var port = process.env.PORT || 3000;
app.use(cors());
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(cookieParser());
// Handlers
app.use(function (req, res, next) {
    var err = __assign({}, new Error('Not Found'), { status: 404 });
    return next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    return res.send(err.message);
});
// Server
var server = app.listen(port, function () {
    return console.log("Server listening on port: " + port);
});
exports.server = server;
