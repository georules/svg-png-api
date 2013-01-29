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
	//var infile = fs.writeFile("im/temp.svg", svgdata, {encoding:'binary'});
	var outfile = fs.createWriteStream(filename, {encoding:'binary'});

	var p = require('child_process').spawn("rsvg-convert",['-f','png']);

	p.stdout.on('data', function(data) {
		outfile.write(data);
	});
	p.on('exit', function () {
		outfile.end();
	});

	console.log(filename);
	p.stdin.write(svgdata);
	p.stdin.end();
	return filename;
}

function process_data(postdata)	{
	var filename = "";
	try {
		filename = convert(postdata.body.svgcode);
	}
	catch(e)	{
		console.log(e);
	}
	return filename;
}


app.get("/", function(req,res)	{
	var template = Handlebars.templates.base;
	var html = template({file:false});
	res.send(html);
});

app.post("/", function(req,res)	{
	var filename = process_data(req);
	fname = filename.replace(__dirname,"");
	var template = Handlebars.templates.base;
	var html = template({file:fname});
	res.send(html);
});

app.get("/api", function(req,res) {
	res.header("Access-Control-Allow-Origin","*");
	info = "post /api/svg requires svgcode parameter"
	app.routes.post[1].info = info;
	res.send(app.routes);
});

app.post("/api/svg", function(req,res) {
	res.header("Access-Control-Allow-Origin","*");
	var filename = process_data(req);
	res.send(filename);
});
app.listen(settings.port, function() {
	console.log("app running on port", settings.port);
});
