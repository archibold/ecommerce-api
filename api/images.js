const firebase = require('../firebase');

exports.getImage = function(req, res) {
	firebase.database().ref('/images/'+ req.params.uid).once('value')
	  .then(function(snapshot) {
	    res.send(snapshot.val());
	  }).catch(function(error) {
	    res.status(404).send(error);
	  });
}