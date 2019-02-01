var firebase = require('./firebase');

exports.login = function(req, res) {
  const user = req.body;

  try {
    firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(function() {
      res.send();
    });
  } catch (error) {
    var errorMessage = error.message;
    res.status(401).send(errorMessage);
  }
}

exports.logout = function(req, res) {
  try {
    firebase.auth().signOut()
    .then(function() {
      res.send()
    })
  } catch(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    res.status(401).send(errorMessage);
  }
}

exports.createAccount = function(req, res) {
  const user = req.body;

  try {
    firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(function() {
      res.send()
    })
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    res.status(401).send(errorMessage);
  }
}

exports.isAuthenticated = function (req, res, next) {
  const user = firebase.auth().currentUser;

  if (user !== null) {
    req.user = user;
    next();
  } else {
    res.status(401).send('unauthorized');
  }
}
