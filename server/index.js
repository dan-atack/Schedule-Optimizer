'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// server functions:

const { addNewEmployee } = require('./functions/employeeDataFunctions');

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

  // ENDPOINTS: must all be prefaced with '/api/' for the FE to not get confused!

  .use(require('./endpoints/loginEnpoints'))
  .use(require('./endpoints/punchclockEndpoints'))
  .use(require('./endpoints/payrollEndpoints'))
  .use(require('./endpoints/notificationEndpoints'))
  .use(require('./endpoints/scheduleEndpoints'))

  //// ** ADD EMPLOYEE ENDPOINT:
  .post('/api/admin/add_new_employee', addNewEmployee)

  .listen(PORT, () => console.log(`listening on port ${PORT}`));
