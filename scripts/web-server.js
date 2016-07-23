var express = require('express');
var path = require('path');
var app = express();

var events =  require('./eventsController');


server = require('http').createServer(app),
io = require('socket.io').listen(server),
fs = require('fs'),
watson = require('watson-developer-cloud'),
extend = require('util')._extend,
UAparser = require('ua-parser-js'),
userAgentParser = new UAparser();
var url = require('url');

var bodyParser = require('body-parser');

var rootPath = path.normalize(__dirname +  '/../');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app'));

app.get('/data/event/:id',events.get);
app.get('/data/event', events.getAll);
app.post('/data/event/:id',events.save);
app.post('/data/save',events.save);

app.get('/api/speak', events.getTTS);
app.get('/api/sample', events.getSampleAudio);
//app.get('/api/speechToText', events.getSpeechToText);



app.get('*',function (req, res) {
    res.sendfile(rootPath + '/app/index.html');

})

app.listen(8000);
console.log('Listening on port 8000...');