var express = require("express");
var app = express.createServer();
var io = require('socket.io').listen(app);

var acc = [];

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());
app.use(express.cookieParser());
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
 	response.render('main',{'acc':acc, 'nname': (request.cookies.nname ? true:false), 'uname' : request.cookies.nname});
});

app.post('/msg',hMessage);
function hMessage (req,rsp)
{
	io.sockets.emit('chatMsg',{name: req.cookies.nname,text:req.param('msg')});
	rsp.send({res:true});
}

app.post('/name',
    function(req,rsp)
    {
        rsp.cookie('nname',req.param('nname'), {maxAge: 24*60*60*1000,path:'/'});
        rsp.send({res:true});
    }
    );

app.listen(8888);
