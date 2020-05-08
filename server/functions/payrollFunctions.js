const { MongoClient } = require('mongodb');
const assert = require('assert');

// Function 1: Get all punch data for a given period, and return all punches that are validated:
// NOTE: We are assuming for now that each in has an out; in future we'll need to either force that to be the case at the punchclock
// UI itself, or add something here to catch asymmetrical punchclock activity.

const getValidPunches = async (req, res) => {
  // will recieve a list of dates in the DB's preferred format (with 'PUNCH' prefix) in the req. body:
  const range = req.body;
  console.log(range);
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('optimizer');
    await db
      .collection('test_punches_vii')
      .find()
      .toArray((err, result) => {
        if (result != null) {
          // first we'll discriminate by date, then from that list, by validity:
          const unfilteredPayload = [];
          // result is the list of punch-date objects, each of which is sub-divided into individual punch objects.
          // Now we filter by date by going through the DB's returns and matching them to the FE's date string array.
          if (range.length > 0) {
            result.forEach((punchdate) => {
              if (range.includes(punchdate._id))
                unfilteredPayload.push(punchdate);
            });
          }
          // discriminate by validity: break dates into their component punches, then test each of those for validation:
          const filteredPayload = [];
          unfilteredPayload.forEach((date) => {
            const punches = Object.values(date);
            punches.forEach((punch) => {
              if (punch.validated) filteredPayload.push(punch);
            });
          });
          res.status(200).json({ status: 200, data: filteredPayload });
        }
      });
  } catch {
    console.log(
      "looks like we'll be using the paper schedule for another year, boys."
    );
    res.status(404).json({ status: 404, data: 'something terrible happened.' });
  }
};

// Function TWO: Submit a week's worth of payroll data to the database:

const submitWeeklyData = async (req, res) => {
  // Rearrange the data to fit the DB's preferred format:
  let _ids = [];
  Object.keys(req.body).forEach((key) => {
    _ids.push(`EMP-${key}`);
  });
  let vals = Object.values(req.body);
  Object.values(req.body).forEach((value, idx) => {
    _ids[idx] = _ids[idx] + value.weekOf;
  });
  let payload = [];
  _ids.forEach((id, idx) => {
    payload.push({
      _id: id,
      weekOf: vals[idx]['weekOf'],
      wage: vals[idx]['wage'],
      hours: vals[idx]['hours'],
      earnings: vals[idx]['earnings'],
      netRevenue: vals[idx]['netRevenue'],
    });
  });
  // Ahh, that's better. Now just send and we'll all get paid.
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('talking to payroll.');
    const db = client.db('optimizer');
    const r = await db.collection('payroll').insertMany(payload);
    assert.equal(payload.length, r.insertedCount);
    console.log('Do you have my stapler?');
    client.close();
    res.status(201).json({
      status: 201,
      data: "Yeahhh, I'm going to need you to talk to payroll about that...",
    });
  } catch (err) {
    res.status(404).json('Sir, we have a problem with the payroll...');
  }
};

// Function THREE: Get individual employee's payroll info:

const getEmployeePaystubs = async (req, res) => {
  const { employee } = req.params;
  console.log(employee);
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('get da money');
    const db = client.db('optimizer');
    const r = await db
      .collection('payroll')
      .find()
      .toArray((err, result) => {
        if (result) {
          // filter for the particular employee:
          const employeePaystubs = result.filter(
            (stub) => stub._id.slice(0, 8) === employee
          );
          res.status(200).json({ status: 200, data: employeePaystubs });
        } else {
          res.status(404).json({ status: 404, data: err });
        }
      });
  } catch {
    console.log("Yeah you're gonna have to talk to payroll about that...");
  }
};

module.exports = { getValidPunches, submitWeeklyData, getEmployeePaystubs };
