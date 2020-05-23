//// ** Payroll Endpoints:

// 1. Get Valid Punches: Takes a post containing the array of dates requested; returns only validated punches from those dates.
// 2. Submit Payroll: Posts a week's payroll data to the DB, which creates a new payroll document for that week.
// 3. Get Employee Paystubs: Gets all of the pay stubs for a particular employee, given their ID as a req.param.

const router = require('express').Router();

const {
  getValidPunches,
  submitWeeklyData,
  getEmployeePaystubs,
} = require('../functions/payrollFunctions');

// For getting all the validated punch data for a given period:
router.post('/api/admin/payroll/valids_for_period', getValidPunches);
// admin endpoint for sending payroll data to the DB:
router.post('/api/admin/submit_payroll', submitWeeklyData);
// employee enpoint for getting paystubs:
router.get('/api/get_paystubs/:employee', getEmployeePaystubs);

module.exports = router;
