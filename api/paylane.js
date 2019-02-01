const axios = require('axios');
const firebase = require('../firebase');

const publicApiKey = process.env.PUBLIC_API_KEY
const paylane_login = process.env.PL_LOGIN
const paylane_pass = process.env.PL_PASS

exports.generateToken = function (req, res) {
  const ccdata = req.body;
  ccdata.public_api_key = publicApiKey;

  axios.post('https://direct.paylane.com/rest.js/cards/generateToken', ccdata)
    .then(function(response) {
      res.send(response.data)
    })
    .catch(function(error) {
      res.send(error)
    })

}

exports.saleByToken = function (req, res) {
  const ccdata = req.body;
  axios.post(encodeURI(`https://${paylane_login}:${paylane_pass}@direct.paylane.com/rest/cards/saleByToken`), ccdata)
  .then(function(response) {
    var updates = {};
    updates['products/' + ccdata.productId + '/isSold'] = true;

    firebase.database().ref().update(updates).then(function(){
      res.send();
    }).catch(function(error) {
      res.status(404).send('buyed but not updated', error.code)
    })
  })
  .catch(function(error) {
    res.send(error)
  })
}
