var settings = require('./settings');

GLOBAL.Handlebars = require('handlebars');
require('./templates/server-templates');

var fs = require('fs');

var express = require('express');
var app = express()
	.use(express.bodyParser())
	.use('/im', express.static(__dirname+'/im'));

function rand_id()	{
	var id = "";
	var text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i=0; i < 5; i++)	{
		id += text.charAt(Math.floor(Math.random() * text.length));
	}
	return id;
}

function convert(svgdata)	{
	var filename = __dirname+"/im/"+rand_id()+".png";
	var p = require('child_process').spawn("convert", ["svg:","png:-"]);
	p.stdout.on('data', function(data) {
		fs.writeFile(filename, data, function(err) {
			if(err)	{
				console.log(err);
			}
		});
	});
	p.stdin.write(svgdata);
	p.stdin.end();
	return filename;
}


app.get("/", function(req,res)	{
	var template = Handlebars.templates.base;
	var html = template({file:false});
	res.send(html);
});

app.post("/", function(req,res)	{
	var filename = ""
	try {
		filename = convert(req.body.svgcode);
	}
	catch (e)	{
		console.log(e);
	}
	fname = filename.replace(__dirname,"");
	var template = Handlebars.templates.base;
	var html = template({file:fname});
	res.send(html);
});

app.get("/api", function(req,res) {
	res.header("Access-Control-Allow-Origin","*");
	res.send(app.routes);
});

app.listen(settings.port, function() {
	console.log("app running on port", settings.port);
});
