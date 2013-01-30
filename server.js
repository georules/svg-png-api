var settings = require('./settings');
var secrets = require('./secrets');

GLOBAL.Handlebars = require('handlebars');
require('./templates/server-templates');

var fs = require('fs');
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/svgpngapi');
var images = db.collection("images");
var request = require('request');

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

function imgurupload(id, data) {
	try {
	console.log("uploading " + id);
	bdata = (new Buffer(data)).toString("base64");
	var headers = {
		'Authorization': 'Client-ID ' + secrets.IMGUR_CLIENT_ID
	};
	var body = {
		'image': bdata,
		'title': id,
		'description':'svg-png-api upload <3'
	};
	var options = {
		method:"post",
		headers:headers,
		json:body,
		url:"https://api.imgur.com/3/image"
	};
	request(options, function(e,r,b) {
		console.log(b);
		images.update({id:id}, {$set:{completed:true,link:b.data.link}});
	});
	} catch(e) {console.log(e);}
}

function convert(svgdata)	{
	var id = rand_id(); // TO-DO: check collision or just use mongodb _id
	image = {id:id, createdAt: new Date(), completed: false};
	images.update({id:id}, image, {upsert:true});
	var filename = __dirname+"/im/"+id+".png";
	try {
	var outfile = fs.createWriteStream(filename, {encoding:'binary'});

	var p = require('child_process').spawn("rsvg-convert",['-f','png']);

	p.stdout.on('data', function(data) {
		outfile.write(data);
	});
	p.on('exit', function () {
		outfile.end();
		fs.readFile(filename, function(e,d)	{
			if (e) {
				console.log(err);
			}
			imgurupload(id,d);
		});
		//image.completed = true;
		//images.update({id:id}, image);
	});

	p.stdin.write(svgdata);
	p.stdin.end();
	}
	catch(e)	{ console.log(e); }
	return id;
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
	try{
	var filename = process_data(req);
	fname = filename.replace(__dirname,"");
	var template = Handlebars.templates.base;
	var html = template({file:fname});
	}
	catch(e) {console.log(e);}
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

app.get("/api/status/:id", function(req,res)	{
	res.header("Access-Control-Allow-Origin","*");
	images.findOne({id:req.params.id}, function(err, image)	{
		res.send(image);
	});
});

app.listen(settings.port, function() {
	console.log("app running on port", settings.port);
});
