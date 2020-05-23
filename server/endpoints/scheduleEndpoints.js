//// ** Schedule Endpoints:

// 1. Post schedule: Posts an array of dates containing schedule data to the DB.
// 2. Get Employee Schedule: Gets an employee's schedule for a given weekly period.

const router = require('express').Router();

const {
  uploadScheduleDraft,
  getEmployeeSched,
} = require('../functions/scheduleFunctions');

// recieves a draft of a week's schedule as one big blob - will parse into dates before uploading to the DB:
router.post('/api/admin/draft-schedule', uploadScheduleDraft);
// what we need now is an endpoint for an individual employee's schedule for a given week:
router.get('/api/schedule/:employee/:weekof', getEmployeeSched); // week of = first date in the selected week

module.exports = router;
