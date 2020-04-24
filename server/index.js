'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// server functions:

const loginPage = require('./functions/serverFunctions');

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

  // endpoints: will relocate in due time:
  .get('/', loginPage)

  .listen(PORT, () => console.log(`listening on port ${PORT}`));
