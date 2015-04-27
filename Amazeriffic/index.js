var http = require('http');
var fs = require('fs');
var url = require('url');
var io = require('socket.io');

var server = http.createServer(function(req, res) {
    
    console.log(req.url);

    switch (req.url) {
        case '/':
            res.writeHead(404);
            res.write("Page not found");
            res.end();
            break;
        case 'page1':
            fs.readfile(__dirname + path, function(error, data) {
                if (error) {
                    console.log(error);
                    res.write("some error in loading page");
                    res.end();
                } else {
                    res.write(data, 'utf8');
                    res.end();
                }
            });
            


    }
});

server.listen(8000);
io.listen(server);
