const { MongoClient } = require('mongodb');
const assert = require('assert');

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

module.exports = { uploadScheduleDraft };
