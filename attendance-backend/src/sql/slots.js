const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

// queries
const INSERT_SLOT = (name, startTime, endTime) => `INSERT INTO SLOT (name, startTime, endTime) VALUES (
    '${name}',
    '${startTime}',
    '${endTime}'
  );`;

const GET_ALL_SLOTS = () => 'SELECT * FROM SLOT;';

// executors
module.exports.createSlot = async (name, startTime, endTime) => {
  const {
    data,
  } = await makeQuery(INSERT_SLOT(name, startTime, endTime), databasePermissions.ADMIN);

  return {
    slotID: data.insertId,
    name,
    startTime,
    endTime,
  };
};

module.exports.getAllSlots = async () => {
  const { data: slots } = await makeQuery(GET_ALL_SLOTS(), databasePermissions.ADMIN);
  return slots;
};
