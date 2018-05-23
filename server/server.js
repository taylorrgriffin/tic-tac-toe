
fs = require('fs');
http = require('http');
express = require('express');

var server = express();
var port = process.env.port || 3000;

server.listen(port, function(error) {
	console.log("listening on port: " + port);
});
