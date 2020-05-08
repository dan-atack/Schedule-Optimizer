const { MongoClient } = require('mongodb');
const assert = require('assert');

// Function One: Sending a notification as a manager:
const postNotification = async (req, res) => {
  const memo = req.body;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connection established.');
    const db = client.db('optimizer');
    const r = await db.collection('notifications').insertOne(memo);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, message: 'Yes. I got the memo.' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, message: "Didn't you get that memo?" });
  }
};

// Function Two: Finding notifications for an employee (all employee accounts check automatically upon sign-in):
const getNotifications = async (req, res) => {
  // employee id will be used to filter the results so we only send back that person's messages:
  const { employee } = req.params;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connexion estblshd');
    const db = client.db('optimizer');
    await db
      .collection('notifications')
      .find()
      .toArray((err, result) => {
        if (result) {
          // Filter for employee's messages:
          const employeeMessages = result.filter((message) =>
            message.recipients.includes(employee)
          );
          res.status(200).json({ status: 200, data: employeeMessages });
        } else {
          res.status(404).json({
            status: 404,
            data: err,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

// Function Three: Update the 'read' status of a message for one employee:

const updateReadStatus = async (req, res) => {
  const { _id, readList } = req.body;
  const newValue = { $set: { readList: readList } };
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connecting');
    const db = client.db('optimizer');
    const r = await db.collection('notifications').updateOne({ _id }, newValue);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(201).json({
      status: 201,
      message: 'Confirmation Recieved. Thank you for reading.',
    });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ status: 404, message: 'Read receipt unsuccessful.' });
  }
};

// Function Four: Get ALL notifications (for manager to view read status):
const getAllNotifications = async (req, res) => {
  // employee id will be used to filter the results so we only send back that person's messages:
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connection established.');
    const db = client.db('optimizer');
    await db
      .collection('notifications')
      .find()
      .toArray((err, result) => {
        if (result) {
          res.status(200).json({ status: 200, data: result });
        } else {
          res.status(404).json({
            status: 404,
            data: err,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  postNotification,
  getNotifications,
  updateReadStatus,
  getAllNotifications,
};
