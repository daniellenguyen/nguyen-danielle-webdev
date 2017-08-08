var app = require('../../express.js');
var userModel = require("../model/user/user.model.server.js");

module.exports = {
  0: createUser,
  1: findUserById,
  2: findUserByUsername,
  3: findUserByCredentials,
  4: updateUser,
  5: deleteUser
};

// http handlers
app.post("/api/user", createUser);
app.get("/api/user", findUserByUsername);
app.get("/api/user", findUserByCredentials);
app.get("/api/user/:uid", findUserById);
app.put("/api/user/:uid", updateUser);
app.delete("/api/user/:uid", deleteUser);

function createUser(request, response) {
  var user = request.body;
  userModel
    .createUser(user)
    .then(function(user) {
      response.json(user);
    });
}

function findUserById(request, response) {
  var userId = request.params.uid;
  userModel
    .findUserById(userId)
    .then(function(user) {
      response.json(user);
    });
}

function findUserByUsername(request, response) {
  var username = request.query.username;
  userModel
    .findUserByUsername(username)
    .then(function(user) {
      response.json(user);
    });
}

function findUserByCredentials(request, response) {
  var username = request.query.username;
  var password = request.query.password;
  userModel
    .findUserByCredentials(username, password)
    .then(function(user) {
      response.json(user);
    });
}

function updateUser(request, response) {
  var userId = request.params.uid;
  var user = request.body;
  userModel
    .updateUser(userId, user)
    .then(function(users) {
      response.json(users);
    });
}

function deleteUser(request, response) {
  var userId = request.params.uid;
  userModel
    .deleteUser(userId)
    .then(function(users) {
      response.json(users);
    });
}


