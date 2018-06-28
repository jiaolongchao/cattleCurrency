var express = require('express');
var fs=require('fs');
var path=require('path');
var url=require('url');
var app = express();//创建一个app

app.use(express.static(path.join(__dirname)));//静态文件服务器指定目录
app.get('/favicon.ico', function (req, res) {
    res.send('404')
});

app.get('/', function (req, res) {
    res.setHeader("Server", "Node 4.2.2/V8");
    fs.createReadStream("index.html").pipe(res);
});

// 终端打印如下信息
app.listen(8080);
console.log("web服务器启动，监听端口8080");