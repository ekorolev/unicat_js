var http = require("http");
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var busboy = require('connect-busboy');
var fs = require('fs');

app.use(bodyParser());
app.use(busboy());
app.use(methodOverride());
app.use(express.static('public'));
app.get("/", function (req, res) {
	res.send("Hello, world!");
});

app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/upload/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

app.listen(8888, function () {
	console.log("server has started!");
});