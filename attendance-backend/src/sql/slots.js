const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

// queries
const INSERT_SLOT = (name, startTime, endTime) => `INSERT INTO SLOT (name, startTime, endTime) VALUES (
    '${name}',
    '${startTime}',
    '${endTime}'
  );`;

// executors
module.exports.createSlot = async (name, startTime, endTime) => {
  const {
    data,
  } = await makeQuery(INSERT_SLOT(name, startTime, endTime), databasePermissions.ADMIN);

  return {
    id: data.insertId,
    name,
    startTime,
    endTime,
  };
};
