const axios = require('axios');

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
    res.send(response.data)
  })
  .catch(function(error) {
    res.send(error)
  })
}
