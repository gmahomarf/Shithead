var express = require("express");

var acc = [];

var app = express.createServer()

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout:false});

app.get('/',function(request, response) {
	response.contentType("html");
	if (acc.length == 10)
 	{
	acc.pop();
	}
 	acc.unshift((new Date()).toString());
 	response.render('main',{'acc':acc});
});

app.post('/msg',hMessage);

function hMessage (req,rsp)
{
	
}

app.listen(8888);