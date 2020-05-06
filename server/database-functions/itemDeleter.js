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

const docReplacer = async () => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connecting');
    const db = client.db('optimizer');
    await db.collection('test_punches_vii').insertOne({
      _id: 'PUNCH-05-04-2020',
      'EMP-2001-PUNCH-IN': {
        employee_id: '2001',
        timeObject: '2020-05-04T15:09:28.301Z',
        punchType: 'IN',
        validated: true,
      },
      'EMP-2002-PUNCH-IN': {
        employee_id: '2002',
        timeObject: '2020-05-04T15:09:31.739Z',
        punchType: 'IN',
        validated: true,
      },
      'EMP-2003-PUNCH-IN': {
        employee_id: '2003',
        timeObject: '2020-05-04T15:09:34.629Z',
        punchType: 'IN',
        validated: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

docReplacer();
