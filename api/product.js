const firebase = require('../firebase');

exports.getProducts = function(req, res) {
  firebase.database().ref('/products/').once('value')
  .then(function(snapshot) {
    let products = [];

    snapshot.forEach(function(childSnapshot) {
      if(!childSnapshot.val().isSold) {
        const product = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        }

        products.push(product);
      }
    })
    products = products.slice(0,4);

    res.send(products);
  }).catch(function(error) {

    res.status(404).send(error);
  });
}

exports.getUserProducts = function(req, res) {
  const uid = firebase.auth().currentUser.uid;

  firebase.database().ref('/products/'+ uid).once('value')
  .then(function(snapshot) {
    let products = [];

    snapshot.forEach(function(childSnapshot) {
        const product = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        }

        products.push(product);
    })

    res.send(products);
  }).catch(function(error) {

    res.status(404).send(error);
  });
}

exports.putProduct = function(req, res) {
  const uid = firebase.auth().currentUser.uid;
  const data = req.body;

  if (!data.description) res.status(404).send('no description');
  if (!data.title) res.status(404).send('no title');
  if (!data.price) res.status(404).send('no price');
  if (!data.image) res.status(404).send('no image');
  
    const image = firebase.database().ref('images').push();
    image.set(data.image)
    .then(function() {
      firebase.database().ref('products/' + uid).push().set({
        id: Math.random().toString(36).substr(2, 9),
        description: data.description,
        title: data.title,
        price: data.price,
        image: image.key,
      }).then(function() {
        res.send();
      }).catch(function(error) {
        res.status(404).send('bad request');
      });
    }).catch(function(error) {
      res.status(404).send('bad request');
    });


}
