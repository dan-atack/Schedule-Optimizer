const { MongoClient } = require('mongodb');
const assert = require('assert');

const getEmployeeSched = async (req, res) => {
  const { employee, weekof } = req.params;
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
        if (result) {
          // result is a list of dates:
          console.log('base fetch result: ', result);
          // create empty list of shifts to return if they contain the employee's id:
          let shiftList = [];
          result.forEach((date) => {
            // the new way brother: each date is comprised of shifts, which are named for the employees themselves:
            if (Object.keys(date.shifts).includes(employee)) {
              console.log(`${employee} is working on ${date._id}`);
              // only add shifts for the employee to the return object, INCLUDING THE DATE:
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

module.exports = { getEmployeeSched };
