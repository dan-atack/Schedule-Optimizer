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

module.exports = { getValidPunches };
