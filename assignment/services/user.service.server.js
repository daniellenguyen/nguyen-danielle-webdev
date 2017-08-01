var app = require('../../express.js');

module.exports = {
  0: createUser,
  1: findUserById,
  2: findUserByUsername,
  3: findUserByCredentials,
  4: updateUser,
  5: deleteUser
};

var users = [
  {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
  {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
  {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
  {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

// http handlers
app.post("/api/user", createUser);
app.get("/api/user", findUserByUsername);
app.get("/api/user", findUserByCredentials);
app.get("/api/user/:uid", findUserById);
app.put("/api/user/:uid", updateUser);
app.delete("/api/user/:uid", deleteUser);

function createUser(request, response) {
  var user = request.body;
  user._id = 0; //TODO get info from input
  users.push(user);
  response.send(user);
}

function findUserById(request, response) {
  var userId = request.params.uid;
  if (userId) {
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        response.send(users[i]);
        return;
      }
    }
  }
}

function findUserByUsername(request, response) {
  var username = request.query.username;
  if (username) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        response.send(users[i]);
        return;
      }
    }
  }
}

function findUserByCredentials(request, response) {
  var username = request.query.username;
  var password = request.query.password;
  if (username && password) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username
        && users[i].password === password) {
        response.send(users[i]);
        return;
      }
    }
  }
}

function updateUser(request, response) {
  var userId = request.params.uid;
  var user = request.body;
  for (var i = 0; i < users.length; i++) {
    if (users[i]._id === userId) {
      users[i] = user;
      response.send(user);
      return;
    }
  }
}

function deleteUser(request, response) { //TODO ask how to implement this
  var userId = request.params.uid;
  for (var i = 0; i < users.length; i++) {
    if (users[i]._id === userId) {
      users.splice(i, 1);
    }
  }
}


