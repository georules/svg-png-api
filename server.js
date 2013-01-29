var settings = require('./settings');

GLOBAL.Handlebars = require('handlebars');
require('./templates/server-templates');

var fs = require('fs');

var express = require('express');
var app = express()
	.use(express.bodyParser())
	.use('/static', express.static(__dirname+'/static'));

function rand_id()	{
	var id = "";
	var text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i=0; i < 5; i++)	{
		id += text.charAt(Math.floor(Math.random() * text.length));
	}
	return id;
}

function convert(svgdata)	{
	var id = rand_id();
	var p = require('child_process').spawn("convert", ["svg:","png:-"]);
	p.stdout.on('data', function(data) {
		fs.writeFile(__dirname+'/im/'+id, data, function(err) {
			if(err)	{
				console.log(err);
			}
		});
	});
	p.stdin.write(svgdata);
	p.stdin.end();
	return id;
}


app.get("/", function(req,res)	{
	var template = Handlebars.templates.base;
	var html = template({});
	res.send(html);
});

app.post("/", function(req,res)	{
	console.log(req.body);
	try {
		convert(req.body.svgcode);
	}
	catch (e)	{
		console.log(e);
	}
	res.send(req.body);
});

app.get("/api", function(req,res) {
	res.header("Access-Control-Allow-Origin","*");
	res.send(app.routes);
});

app.listen(settings.port, function() {
	console.log("app running on port", settings.port);
});
