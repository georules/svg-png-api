(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['base'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<!DOCTYPE html>\n<html>\n<head>\n	<link href=\"http://twitter.github.com/bootstrap/1.4.0/bootstrap.css\" rel=\"stylesheet\">\n	<style>.content {padding-top:80px;}</style>\n</head>\n<body>\n	<div class=\"topbar\">\n		<div class=\"fill\">\n			<div class=\"container\">\n					<h2><a href=\"/\">svg-png-api</a> <small>why?  I wanted to try.</small></h2>\n			</div>\n		</div>\n	</div>\n	<div class=\"container\">\n		<div class=\"content\">\n			<div class=\"page-header\"><h2>Paste your svg</h2></div>\n			<form action='/' method='post' enctype=\"application/x-www-form-urlencoded\">\n				<textarea rows='5' cols='50' name='svgcode'></textarea>\n				<br /><br />\n				<input type='submit' class='btn primary'>\n			</form>\n		</div>\n	</div>\n</body>\n\n</html>\n";});
})();
