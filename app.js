var express = require("express");
var app = express.createServer();
var io = require('socket.io').listen(app);

var acc = [];

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());
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
	io.sockets.emit('chatMsg',{name:'',text:req.param('msg')});
	rsp.send({res:true});
}

app.listen(8888);
