const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 5000

const publicApiKey = process.env.PUBLIC_API_KEY
const paylane_login = process.env.PL_LOGIN
const paylane_pass = process.env.PL_PASS

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cors({ origin: true }))
  .get('/', (req, res) => res.send('API'))
  .post('/api/generateToken', function (req, res) {
    const ccdata = req.body;
    ccdata.public_api_key = publicApiKey;

    axios.post('https://direct.paylane.com/rest.js/cards/generateToken', ccdata)
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {
        res.send(error)
      })

  })
  .post('/api/saleByToken', function (req, res) {
    const ccdata = req.body;
  axios.post(encodeURI(`https://${paylane_login}:${paylane_pass}@direct.paylane.com/rest/cards/saleByToken`), ccdata)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      res.send(error)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
