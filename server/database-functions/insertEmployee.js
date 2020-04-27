const { MongoClient } = require('mongodb');
const assert = require('assert');

// Initial DB Insert function for adding employees to the employee collection:

// Takes rather a lot of arguments but this can be largely done 'behind the scenes'
// i.e. when the manager fills out a form to register a new employee...
const addNewEmployee = async (
  id,
  password,
  userName,
  isAdmin,
  hireDate,
  email,
  wage,
  title
) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('initiating db connection');
  try {
    const db = client.db('optimizer');
    const r = await db.collection('employees').insertOne({
      _id: `EMP-${id}`,
      password: password,
      userName: userName,
      isAdmin: isAdmin,
      hireDate: hireDate,
      email: email,
      wage: wage,
      title: title,
    });
    assert.equal(1, r.insertedCount);
    console.log('looking good... Mister President :P');
    client.close();
  } catch (err) {
    console.log('Uhh Mister Atack? It happened again...');
    console.log(err);
  }
};

addNewEmployee(
  2005,
  'bigred_177',
  'Scarlet Pimpernel',
  false,
  '26-04-2020',
  'scarlet@atackstationary.com',
  80,
  'VP Marketing'
);
