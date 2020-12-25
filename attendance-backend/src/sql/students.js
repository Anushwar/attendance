const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createValidationError, createPermissionError } = require('../helpers/errors');

const INSERT_STUDENT = (uid, name, password) => `INSERT INTO STUDENT VALUES(
    '${uid}',
    '${name}',
    '${password}'
)`;

const SELECT_STUDENT_BY_UID = (uid) => `SELECT * FROM STUDENT WHERE uid='${uid}'`;

module.exports.createNewStudent = async (uid, name, password) => {
  if (!/^\S{5,}$/.test(uid)) {
    throw createValidationError('student_id_invalid', 'Invalid student ID');
  }

  await makeQuery(INSERT_STUDENT(uid, name, password), databasePermissions.ADMIN);

  return { uid, name, password };
};

module.exports.getStudentDetails = async (uid) => {
  if (!/^\S{5,}$/.test(uid)) {
    throw createValidationError('student_id_invalid', 'The requested student id format is incorrect');
  }
  const { data } = await makeQuery(SELECT_STUDENT_BY_UID(uid), databasePermissions.ADMIN);
  if (data.length <= 0) {
    throw createPermissionError('student_id_notfound', 'The student ID entered is not present');
  }
  return data[0];
};
