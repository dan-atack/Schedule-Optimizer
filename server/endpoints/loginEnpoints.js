//// ** Login Endpoints: Everything needed for logging and punching in:
// 1. Login page: takes a post containing an employee's ID and PW, checks vs the DB and returns (most) of the employee's data if PW is good.
// 2. Scheduled Employee IDs: Upon app initialization, gets the IDs of just the employees scheduled to work today.
// 3. Employee List: Gets all info except PWs for all employees - a less selective version of endpoint # 2.
// 4. Setup Date: Adds a new date to the DB punches collection as a precursor to any punchclock activity.

const router = require('express').Router();

const {
  loginPage,
  listEmployees,
  listScheduledEmployees,
  setupDateInDB,
} = require('../functions/initialFunctions');

// login page: recieve employee id and pw; send back confirmation (NOTE: And retain the id of the logged-in employee??)
router.post('/api/login', loginPage);
// get employee ids (future upgrade returns only the id's of people on TODAY's schedule) to assist with punchclock activity:
router.get('/api/schedule_ids', listScheduledEmployees);
// sends the list of employees from the DB (minus their passwords, haha)
router.get('/api/admin/employees', listEmployees);
// ensure there is an empty date in the database for punches to go into (this happens on initial load of the app):
router.post('/api/setup_date', setupDateInDB);

module.exports = router;
