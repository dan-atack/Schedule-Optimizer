'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// server functions:

const { loginPage, listEmployees } = require('./functions/serverFunctions');

const PORT = 8080;

express()
  .use(function (req, res, next) {
    // allow all types of requests to the server:
    res.header('Access-Control-Allow-Origin', '*');
    // allow Origin, X-requested-with, content-type and accept headers (we use some of these for posts!)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(express.static('./server/assets'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // endpoints: must all be prefaced with '/api/' for the FE to not get confused!
  .post('/api/login', loginPage)
  .get('/api/admin/employees', listEmployees)

  .listen(PORT, () => console.log(`listening on port ${PORT}`));
