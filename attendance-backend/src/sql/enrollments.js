const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

// queries
const INSERT_ENROLLMENT = (classID, courseID, tid) => `INSERT INTO ENROLLMENT VALUES (
    '${classID}',
    '${courseID}',
    '${tid}'
  );`;

const GET_ALL_ENROLLMENT = 'SELECT * FROM ENROLLMENT;';

// executors
module.exports.createEnrollment = async (classID, courseID, tid) => {
  await makeQuery(INSERT_ENROLLMENT(classID, courseID, tid), databasePermissions.ADMIN);

  return { classID, courseID, tid };
};

module.exports.getAllEnrollment = async () => {
  const { data: enrollments } = await makeQuery(GET_ALL_ENROLLMENT, databasePermissions.ADMIN);
  return enrollments;
};
