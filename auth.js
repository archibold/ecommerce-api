var firebase = require('./firebase');

exports.login = function(req, res) {
  const user = req.body;

  try {
    firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(function(response) {
      res.send();
    });
  } catch (err) {
    console.log(error);
    var errorMessage = error.message;
    res.status(401).send(errorMessage);
  }
}

exports.logout = function(req, res) {
  firebase.auth().signOut()
  .then(function(response) {
    res.send();
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    res.status(401).send(errorMessage);
  });
}

exports.createAccount = function(req, res) {
  const user = req.body;

  firebase.auth()
  .createUserWithEmailAndPassword(user.email, user.password)
  .then(function(response) {
    res.send(response.data)
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    res.status(401).send(errorMessage);
  });
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
