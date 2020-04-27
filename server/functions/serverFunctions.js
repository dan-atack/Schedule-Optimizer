const { MongoClient } = require('mongodb');
const assert = require('assert');

// Might end up redistributing these to a few different files.. For now there's just 2 functions in here:
// 1 - The Login page handler
// 2 - The Employee list getter

// primary login function takes a userid/pw combo, checks it against the DB, and notifies the FE if the login attempt is good:

const loginPage = async (req, res) => {
  const { userId, pw } = req.body;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('optimizer');
    await db
      // Allllmost ready to migrate to the 'real' database!
      .collection('employees')
      .findOne({ _id: `EMP-${userId}` }, (err, result) => {
        if (result) {
          // once we get the result back we need to check that the name matches the password and send back an appropriate response:
          result.password == pw
            ? res.status(200).json({
                status: 200,
                // if login is good, send back the user's name and admin status for the FE to use:
                userData: {
                  userName: result.userName,
                  isAdmin: result.isAdmin,
                },
              })
            : res
                // status 401 = unauthorized
                .status(401)
                .json({
                  status: 401,
                  message: 'Incorrect password entered for this user Id.',
                });
        } else {
          // if the employee's ID is not found in the database send a 404 message:
          res
            .status(404)
            .json({ status: 404, message: 'employee not found in database' });
        }
        client.close();
      });
  } catch {
    console.log('pray to gawd you do not see this message.');
  }
};

const listEmployees = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('optimizer');
    await db
      .collection('employees')
      .find()
      .toArray((err, result) => {
        if (result) {
          // employee 'list' will be an object to make it more searchable:
          let data = {};
          result.forEach((employee) => {
            data[`${employee._id}`] = {
              _id: employee._id,
              userName: employee.userName,
              isAdmin: employee.isAdmin,
            };
          });
          res.status(200).json({ status: 200, data: data });
        } else {
          res.status(404).json({ status: 404, message: err });
        }
      });
  } catch {
    console.log(
      'ruh roh! Looks like we did not fetch all the employees due to human error.'
    );
  }
};

module.exports = { loginPage, listEmployees };
