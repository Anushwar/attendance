const { databasePermissions } = require('../helpers/constants');
const makeQuery = require('../helpers/result');

// queries
const INSERT_ENLISTMENT = (classID, courseID, uid) => `INSERT INTO STUD_ENLISTMENT VALUES (
    '${classID}',
    '${courseID}',
    '${uid}'
);`;

const GET_ALL_ENLISTMENT = 'SELECT * FROM STUD_ENLISTMENT';

// executors
module.exports.createEnlistment = async (classID, courseID, uid) => {
  await makeQuery(INSERT_ENLISTMENT(classID, courseID, uid), databasePermissions.ADMIN);

  return { classID, courseID, uid };
};

module.exports.getAllEnlistment = async () => {
  const { data: enlistments } = await makeQuery(GET_ALL_ENLISTMENT, databasePermissions.ADMIN);
  return enlistments;
};
