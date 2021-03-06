var http = require('http'),
	fs = require('fs')

var server = http.createServer(function(req, res) {
	function serve(path, type) {
		res.writeHead(200, {'Content-Type': type})
		fs.createReadStream(path).pipe(res)
	}
	if (req.method == 'GET' && req.url.substr(-4) =='.gif') {
		fs.stat(__dirname + req.url, function(err, stat){
			if (err || !stat.isFile()) {
				res.writeHead(404)
				res.end('not Found')
				return
			} 
			serve(__dirname + req.url, 'application/gif')

		})
	} else if (req.method == 'GET' && req.url == '/') {
		serve(__dirname + '/index.html', 'text/html')
	} else {
		res.writeHead(404)
		res.end('not Found')
	}
})
server.listen(3000)