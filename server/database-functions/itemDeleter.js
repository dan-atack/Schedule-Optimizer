const { MongoClient } = require('mongodb');
const assert = require('assert');

// will work by retrieving the selected punchdate item, the copying it, removing the unwanted data, and re-inserting it as an update:
const deleteBadPunches = async () => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connecting');
    const db = client.db('optimizer');
    await db
      .collection('test_punches_vi')
      .find()
      .toArray((err, result) => {
        result ? console.log(result) : console.log(err);
      });
  } catch {
    console.log('dammit.');
  }
};

const docUpdater = async () => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connecting');
    const db = client.db('optimizer');
    // update func seems to prefer that these values are defined BEFORE calling updateOne... don't ask why!
    const query = { _id: 'MEMO-2020-05-06T14:33:14-04:00' };
    const newValue = { $set: { subject: 'TPS Reports' } };
    const r = await db.collection('notifications').updateOne(query, newValue);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    console.log('subject added');
  } catch (err) {
    console.log(err.stack);
  }
};

docUpdater();
