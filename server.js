var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//require("./assignment/app.js"); // assignment server
require("./public/project/server/users.js");
require("./database.js");
//require("./public/project/poc/server.js"); // proof of concept server
require("./public/project/server/search.js");

app.listen(port);