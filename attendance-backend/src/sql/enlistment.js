const { databasePermissions } = require('../helpers/constants');
const makeQuery = require('../helpers/result');

// queries
const INSERT_ENLISTMENT = (uid, courseID) => `INSERT INTO STUD_ENLISTMENT VALUES (
    '${uid}',
    '${courseID}'
);`;

const GET_ALL_ENLISTMENT = 'SELECT * FROM STUD_ENLISTMENT';

// executors
module.exports.createEnlistment = async (uid, courseID) => {
  await makeQuery(INSERT_ENLISTMENT(uid, courseID), databasePermissions.ADMIN);

  return { uid, courseID };
};

module.exports.getAllEnlistment = async () => {
  const { data: enlistments } = await makeQuery(GET_ALL_ENLISTMENT, databasePermissions.ADMIN);
  return enlistments;
};
