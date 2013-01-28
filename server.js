var express = require('express');
var app = express();
var port = 80;

app.get("/", function(req,res,next) {
	res.header("Access-Control-Allow-Origin","*");
	res.send(app.routes);
});

app.listen(port, function() {
	console.log("app running on port", port);
});
