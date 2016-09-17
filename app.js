var http = require("http");
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(express.static('public'));
app.get("/", function (req, res) {
	res.send("Hello, world!");
});


app.listen(8888, function () {
	console.log("server has started!");
});