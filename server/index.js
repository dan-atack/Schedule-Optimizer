'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// server functions:

const {
  loginPage,
  listEmployees,
  listScheduledEmployees,
  setupDateInDB,
} = require('./functions/initialFunctions');
const { uploadScheduleDraft } = require('./functions/uploadSchedule');
const { getEmployeeSched } = require('./functions/getEmployeeSched');
const {
  punchClock,
  viewPunchesForDate,
  viewRangeOfPunches,
  validatePunch,
} = require('./functions/punchclockFunctions');
const {
  getValidPunches,
  submitWeeklyData,
  getEmployeePaystubs,
} = require('./functions/payrollFunctions');
const {
  postNotification,
  getNotifications,
  updateReadStatus,
  getAllNotifications,
} = require('./functions/notificationFunctions');
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
  //// ** LOGIN ENDPOINTS - Everything related to logging into the app:
  // login page: recieve employee id and pw; send back confirmation (NOTE: And retain the id of the logged-in employee??)
  .post('/api/login', loginPage)
  // get employee ids (future upgrade returns only the id's of people on TODAY's schedule) to assist with punchclock activity:
  .get('/api/schedule_ids', listScheduledEmployees)
  // ensure there is an empty date in the database for punches to go into (this happens on initial load of the app):
  .post('/api/setup_date', setupDateInDB)
  // punchclock endpoints: use req body for employee id, time, in/out (one endpoint for both since they both go together):
  .post('/api/punch', punchClock)
  //// ** ADMIN ENDPOINTS FOR VIEWING/APPROVING PUNCHCLOCK ACTIVITY:
  // For viewing a single date's punches:
  .get('/api/admin/punches/:date', viewPunchesForDate)
  // for viewing the punches for a range of dates (post for simplicity, so we can send a list of dates to filter on server side):
  .post('/api/admin/punches/range/week', viewRangeOfPunches)
  // For approving a single punch:
  .post('/api/admin/punches/validate/:date', validatePunch)
  //// ** ADMIN ENDPOINTS FOR PAYROLL DATA:
  // For getting all the validated punch data for a given period:
  .post('/api/admin/payroll/valids_for_period', getValidPunches)
  // admin endpoint for sending payroll data to the DB:
  .post('/api/admin/submit_payroll', submitWeeklyData)
  // employee enpoint for getting paystubs:
  .get('/api/get_paystubs/:employee', getEmployeePaystubs)
  // sends the list of employees from the DB (minus their passwords, haha)
  .get('/api/admin/employees', listEmployees)
  //// ** SCHEDULE ENDPOINTS:
  // recieves a draft of a week's schedule as one big blob - will parse into dates before uploading to the DB:
  .post('/api/admin/draft-schedule', uploadScheduleDraft)
  // what we need now is an endpoint for an individual employee's schedule for a given week:
  .get('/api/schedule/:employee/:weekof', getEmployeeSched) // week of = first date in the selected week
  //// ** NOTIFICATION ENDPOINTS:
  // admin endpoint for posting a notification:
  .post('/api/admin/send_notification', postNotification)
  // admin endpoint for viewing read status of all previously sent messages:
  .get('/api/admin/view_all_notifications', getAllNotifications)
  // employee endpoint for getting notifications:
  .get('/api/get_notifications/:employee', getNotifications)
  // employee endpoint for updating the read status of a notification:
  .post('/api/update_read_status', updateReadStatus)
  //// ** ADD EMPLOYEE ENDPOINT:
  .post('/api/admin/add_new_employee', addNewEmployee)

  .listen(PORT, () => console.log(`listening on port ${PORT}`));
