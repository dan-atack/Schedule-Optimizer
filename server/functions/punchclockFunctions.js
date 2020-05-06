const { MongoClient } = require('mongodb');
const assert = require('assert');

// Punchclock function modifies an existing 'PUNCH-<date>' object in the DB for the given date, adding the punch data as an update:
const punchClock = async (req, res) => {
  // break down req body into query and newValue:
  const query = { _id: `PUNCH-${req.body.date_id}` };
  // $set operator dumps all of this data into the main body of the date... too messy, we need to keep the data together,
  // with a package named for the employee: 'EMP-2001-PUNCH-IN':
  const punchLabel = `EMP-${req.body.employee_id}-PUNCH-${req.body.punchType}`;
  const newValue = {
    $set: {
      [punchLabel]: {
        employee_id: req.body.employee_id,
        timeObject: req.body.timeObject,
        punchType: req.body.punchType,
        validated: req.body.validated,
      },
    },
  };
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connection established.');
    const db = client.db('optimizer');
    // remember the args for updateOne: query, newValue:
    const r = await db
      .collection('test_punches_vii')
      .updateOne(query, newValue);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(201).json({
      status: 201,
      message: `Punch for employee ${req.body.employee_id} accepted.`,
    });
    client.close();
    console.log('closing connection.');
  } catch (err) {
    console.log(err.stack);
  }
};

//// ** VIEWING PUNCHES AS ADMIN:
// View punches for one specific date:
const viewPunchesForDate = async (req, res) => {
  const dbQuery = { _id: `PUNCH-${req.params.date}` };
  console.log(dbQuery);
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connecting');
    const db = client.db('optimizer');
    await db.collection('test_punches_vii').findOne(dbQuery, (err, result) => {
      result
        ? res.status(200).json({ status: 200, data: Object.values(result) })
        : res.status(404).json({ status: 404, data: 'Data not found' });
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
  }
};

// View all punches for a selected date RANGE:
const viewRangeOfPunches = async (req, res) => {
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
          const payload = [];
          // result is the list of punch-date objects, each of which is sub-divided into individual punch objects.
          // Now we filter by date by going through the DB's returns and matching them to the FE's date string array.
          if (range.length > 0) {
            result.forEach((punchdate) => {
              if (range.includes(punchdate._id)) payload.push(punchdate);
            });
          } else {
            // NOTE: If the range of dates sent by the FE is EMPTY, send all info directly:
            result.forEach((punchdate) => payload.push(punchdate));
          }
          res.status(200).json({ status: 200, data: payload });
        }
      });
  } catch {
    console.log(
      "looks like we'll be using the paper schedule for another year, boys."
    );
    res.status(404).json({ status: 404, data: 'something terrible happened.' });
  }
};

//// ** UPDATING PUNCH INFO AS ADMIN:
// Validate a punch (as admin):
const validatePunch = async (req, res) => {
  const { date } = req.params;
  // query represents the _id-date pair; the highest level in the punch collection:
  const query = { _id: `PUNCH-${date}` };
  const { employee, timeObject, inOrOut, validity } = req.body;
  // if successful, the punchcode represents the key for the individual punch data bit, or the second-highest level in the punch col.:
  const punchCode = `EMP-${employee}-PUNCH-${inOrOut}`;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('are we in?');
    const db = client.db('optimizer');
    const r = await db.collection('test_punches_vii').updateOne(query, {
      $set: {
        [punchCode]: {
          employee_id: employee,
          timeObject: timeObject,
          punchType: inOrOut,
          validated: validity,
        },
      },
    });
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(201).json({
      status: 201,
      updatedData: {
        employee_id: employee,
        timeObject: timeObject,
        punchType: inOrOut,
        validated: validity,
      },
    });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({
      status: 404,
      updatedData:
        "there was an error updating this employee's punch data. Please try again later.",
    });
  }
};

module.exports = {
  punchClock,
  viewPunchesForDate,
  viewRangeOfPunches,
  validatePunch,
};
