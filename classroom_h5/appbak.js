var http = require('http');
var express = require('express');
var fs=require('fs');
var path=require('path');
var url=require('url');
var app = express();//创建一个app
var httpProxy = require('http-proxy');

app.use(express.static(path.join(__dirname)));//静态文件服务器指定目录
app.get('/favicon.ico', function (req, res) {
    res.send('404')
});

var proxy = httpProxy.createProxyServer({
    target: 'http://192.168.10.38:8180/',   //接口地址
    // 下面的设置用于https
    // ssl: {
    //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
    //     cert: fs.readFileSync('server.crt', 'utf8')
    // },
    // secure: false
});

proxy.on('error', function(err, req, res){
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    //var realPath = path.join("main-pages", pathname); // 指定根目录
    var realPath = path.join("./", pathname);
    console.log(pathname);
    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';

    //判断如果是接口访问，则通过proxy转发
    if(pathname.indexOf("mspj-mall-admin") > 0){
        proxy.web(request, response);
        return;
    }

    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});

server.get('/', function (req, res) {
    res.setHeader("Server", "Node 4.2.2/V8");
    fs.createReadStream("index.html").pipe(res);
});

// 终端打印如下信息
server.listen(3000);
console.log("Server runing at port: " + PORT + ".");