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
  .post('/admin/register', auth.createAccount);
  .post('/admin/login', auth.login)
  .get('/admin/logout', auth.logout)
  .get('/admin/isAuth', auth.isAuth)
  .get('/', (req, res) => res.send('API'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
