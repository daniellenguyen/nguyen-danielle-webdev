var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.listen(port);

require("./test/app");
require("./assignment/app.js");