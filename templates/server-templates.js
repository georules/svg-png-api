(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['base'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"page-header\"><h2>Your PNG file</h2></div>\n			<p id=\"myid\">";
  foundHelper = helpers.file;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.file; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</p>\n			<p id=\"output\"></p>\n			";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n			<div class=\"page-header\"><h2>Paste your svg</h2></div>\n			<form action='/' method='post' enctype=\"application/x-www-form-urlencoded\">\n				<textarea rows='25' class='input-xxlarge' name='svgcode'></textarea>\n				<br /><br />\n				<input type='submit' class='btn primary'>\n			</form>\n			";}

  buffer += "<!DOCTYPE html>\n<html>\n<head>\n	<link href=\"http://twitter.github.com/bootstrap/1.4.0/bootstrap.css\" rel=\"stylesheet\">\n	<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js\" type=\"text/javascript\"></script>\n	<style>.content {padding-top:80px;}</style>\n</head>\n<body>\n	<div class=\"topbar\">\n		<div class=\"fill\">\n			<div class=\"container\">\n					<h2><a href=\"/\">svg-png-api</a> <small>why?  I wanted to try.</small></h2>\n			</div>\n		</div>\n	</div>\n	<div class=\"container\">\n		<div class=\"content\">\n			";
  stack1 = depth0.file;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>\n<script type=\"text/javascript\">\nvar id = $('#myid').html();\nfunction getdata() {\n	$.get(\"/api/status/\"+id, function(data)	{\n		if (data.completed) {\n			$('#output').html(\"<a href='\" + data.link + \"'>\" + data.link + \"</a>\");\n			clearInterval(t);\n		}\n	});\n}\nif (id) {\n	$('#output').html('<img src=\"/static/spinna.gif\" alt=\"spinnas\">');\n	var t = setTimeout(getdata, 1000);\n}\n</script>\n</body>\n\n</html>\n";
  return buffer;});
})();
