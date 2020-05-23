//// ** Punchclock Endpoints:

// 1. Punchclock: Basic endpoint for recieving in/out punches - takes a post for the time, id and punch-type.
// 2. View Punches for Date: Returns all the punch clock data for a specified date (given as a req.param).
// 3. View Range of Punches: Accepts a post containing the array of date _id's to be returned.
// 4. Validate Punch: Posts a copy of a punch's data to the DB with an alteration to the 'validation' status.

const router = require('express').Router();

const {
  punchClock,
  viewPunchesForDate,
  viewRangeOfPunches,
  validatePunch,
} = require('../functions/punchclockFunctions');

// punch in or out endpoint: use req body for employee id, time, in/out (one endpoint for both since they both go together):
router.post('/api/punch', punchClock);
// For viewing a single date's punches:
router.get('/api/admin/punches/:date', viewPunchesForDate);
// for viewing the punches for a range of dates (post for simplicity, so we can send a list of dates to filter on server side):
router.post('/api/admin/punches/range/week', viewRangeOfPunches);
// For approving a single punch:
router.post('/api/admin/punches/validate/:date', validatePunch);

module.exports = router;
