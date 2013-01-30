POST /api/svg
=============
Parameters
----------
* svgcode - your SVG code

Response
---------
* the id to GET /api/status/:id.  Do this until completed==true.  When completed==true, you will get link:url to imgur.  

Todo
======
Clean up code, handle errors better
Consider file cache during processing
Provide error reponse if error in processing
Provide the other sizes of the image that imgur processes for you (thumbnail)
Check internal id collision or just use mongodb _id

Requires
==========
* node.js
	* express
	* handlebars
	* mongoskin
	* request
* rsvg-convert
* mongodb
