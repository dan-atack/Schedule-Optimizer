const { MongoClient } = require('mongodb');
const assert = require('assert');

// Initial DB Insert function for adding employees to the employee collection:

// Takes rather a lot of arguments but this can be largely done 'behind the scenes'
// i.e. when the manager fills out a form to register a new employee...
const addNewEmployee = async (req, res) => {
  const employee = req.body;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('initiating db connection');
  try {
    const db = client.db('optimizer');
    const r = await db.collection('employees').insertOne(employee);
    assert.equal(1, r.insertedCount);
    res
      .status(201)
      .json({ status: 201, message: 'Employee Added. Welcome to the team!' });
    client.close();
  } catch (err) {
    res
      .status(404)
      .json({
        status: 404,
        message: 'Uhh, Mister Atack? It happened again...',
      });
    console.log(err);
  }
};

module.exports = { addNewEmployee };
