const { MongoClient } = require('mongodb');
const assert = require('assert');

// File contains 2 functions: Upload Schedule Draft (for admins posting schedules) and Get Schedule (for individual employees).

// Function One - Upload Schedule Draft: Admin posts a week of schedule data to the DB:
const uploadScheduleDraft = async (req, res) => {
  // Schedule draft data initially comes in one mega-object:
  const data = req.body;
  const dateKeys = Object.keys(data.dates);
  const dateValues = Object.values(data.dates);
  // Crude but effective way to convert a big object to an array of smaller ones:
  let mappedDataList = [];
  for (let i = 0; i < dateKeys.length; i++) {
    const key = dateKeys[i];
    const val = dateValues[i];
    const obj = {};
    // make the date string the _id:
    obj._id = key;
    // draft status - will be used in time to save drafts that are not yet meant for distribution:
    obj.draft = true;
    // the rest of the data for a date is in the 'data' property - not too elegant but functional.. I hope!
    obj.shifts = val;
    mappedDataList.push(obj);
  }
  console.log('datalist ', mappedDataList);
  // Now let's load that sucker into the DB!!!
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('initiating connection');
    const db = client.db('optimizer');
    // now into our sixth test draft file:
    const r = await db.collection('testdraft_vii').insertMany(mappedDataList);
    assert.equal(mappedDataList.length, r.insertedCount);
    console.log('data in.');
    client.close();
    console.log('closing connection.');
  } catch (err) {
    console.log(err.stack);
  }
};

// Function Two - Fetches all of the schedule data for a given employee:
const getEmployeeSched = async (req, res) => {
  const { employee } = req.params;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('optimizer');
    await db
      .collection('testdraft_vii')
      .find()
      .toArray((err, result) => {
        // Result is a list of dates.
        if (result) {
          // Create empty list of shifts to return if they contain the employee's id:
          let shiftList = [];
          result.forEach((date) => {
            // Each date is comprised of shifts, which are named for the employees themselves:
            if (Object.keys(date.shifts).includes(employee)) {
              // Only add shifts for the employee to the return object, INCLUDING THE DATE:
              shiftList.push({ date: date._id, shift: date.shifts[employee] });
            }
          });
          res.status(200).json({ status: 200, data: shiftList });
        } else {
          console.log(err);
          res.status(404).json({
            status: 404,
            message: 'no data found for search parameters',
          });
        }
      });
  } catch {
    console.log('Uhh Mister Atack? It happened again!');
  }
};

module.exports = { uploadScheduleDraft, getEmployeeSched };
