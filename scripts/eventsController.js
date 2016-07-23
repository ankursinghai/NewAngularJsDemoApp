/**
 * Created by Ankur on 20-07-2016.
 */
var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname +  '/../');

server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    watson = require('watson-developer-cloud'),
    extend = require('util')._extend,
    UAparser = require('ua-parser-js'),
    userAgentParser = new UAparser();
var url = require('url');

var bodyParser = require('body-parser');

module.exports.get = function (req, res) {
    var event = fs.readFileSync('app/data/event/' + req.params.id + '.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(event);
};

module.exports.save = function (req, res) {
    var event = req.body;
    fs.writeFileSync('app/data/event/' + req.params.id + '.json', JSON.stringify(event));
    res.send(event);
}

module.exports.getAll = function (req, res) {
    var path = 'app/data/event/';
    var files = [];
    try {
        files = fs.readdirSync(path);
    }
    catch (e) {
        console.log(e)
        res.send('[]');
        res.end();
    }
    var results = "[";
    for (var idx = 0; idx < files.length; idx++) {
        if (files[idx].indexOf(".json") == files[idx].length - 5) {
            results += fs.readFileSync(path + "/" + files[idx]) + ",";
        }
    }
    results = results.substr(0, results.length - 1);
    results += "]";

    res.setHeader('Content-Type', 'application/json');
    res.send(results);
    res.end();
};


module.exports.getTTS = function(req, res) {

    var query = url.parse(req.url, true).query;
    console.log(query.text);
    var text_to_speech = watson.text_to_speech({
        username: 'e7659d7e-0341-4a77-9e9a-63a93dcac4c5',
        password: 'B6NImn3TLGtn',
        version: 'v1',
        url: 'https://stream.watsonplatform.net/text-to-speech/api'
    });

    var params = {
        text: query.text,
        voice: 'en-US_AllisonVoice', // Optional voice
        accept: 'audio/wav'
    };

    text_to_speech.synthesize(params).pipe(res);
};


module.exports.getSampleAudio = function(request, response) {

    var filePath = path.join(__dirname, 'Us_English_Broadband_Sample_1.wav');
    console.log(filePath);
    var stat = fs.statSync(filePath);

//Start Speech to text
    var speech_to_text = watson.speech_to_text({
        username: '7546c61a-d819-4b30-8e14-2921777678b5',
        password: 'IafXtQVcDI5a',
        version: 'v1'
    });
    var params = {
        // From file
        audio: fs.createReadStream(filePath),
        content_type: 'audio/l16; rate=44100'
    };

    console.log('Calling speech to text');
    speech_to_text.recognize(params, function(err, response) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('speech to text converted');
            console.log(JSON.stringify(response, null, 2));
        }
    });
//End Speech to text

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.on('data', function(data) {
        response.write(data);
    });

    readStream.on('end', function() {
        response.end();
    });
};


module.exports.ask = function(req, res) {

    var query = url.parse(req.url, true).query;
    console.log(query.questionText);
    var text_to_speech = watson.text_to_speech({
        username: 'e7659d7e-0341-4a77-9e9a-63a93dcac4c5',
        password: 'B6NImn3TLGtn',
        version: 'v1',
        url: 'https://stream.watsonplatform.net/text-to-speech/api'
    });

    var params = {
        text: query.text,
        voice: 'en-US_AllisonVoice', // Optional voice
        accept: 'audio/wav'
    };

    text_to_speech.synthesize(params).pipe(res);
};