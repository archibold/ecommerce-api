var firebase = require('../firebase');

exports.getProducts = function(req, res) {
  firebase.database().ref('/products/').once('value')
  .then(function(snapshot) {
    res.send(snapshot.val());
  }).catch(function(error) {
    res.status(404).send('bad request');
  });
}

exports.putProduct = function(req, res) {
  const data = req.body;
  if(!data.description) res.status(404).send('no description');
  if(!data.title) res.status(404).send('no title');
  if(!data.price) res.status(404).send('no price');
  if(!data.image) res.status(404).send('no image');

  firebase.database().ref('products/').push().set({
    id: Math.random().toString(36).substr(2, 9),
    description: data.description,
    title: data.title,
    price: data.price,
    image: data.image
  }).then(function() {
    res.send();
  }).catch(function(error) {
    res.status(404).send('bad request');
  })
}
