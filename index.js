const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api/');
const auth = require('./auth');

const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cors({ origin: true }))
  .use('/api', api)
  // Auth
  // router.post('/createAccount', auth.createAccount);
  .post('/login', auth.login)
  .get('/logout', auth.logout)
  .get('/', (req, res) => res.send('API'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
