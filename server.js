var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app.js");
//require("./public/project/poc/server.js");
require("./public/project/server/search.js");

app.listen(port);