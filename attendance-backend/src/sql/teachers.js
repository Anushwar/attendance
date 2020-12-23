const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createValidationError, createPermissionError } = require('../helpers/errors');

const INSERT_TEACHER = (tid, name, password) => `INSERT INTO TEACHER VALUES(
    '${tid}',
    '${name}',
    '${password}'
);`;

const SELECT_TEACHER_BY_TID = (tid) => `SELECT * FROM TEACHER WHERE tid='${tid}'`;

module.exports.createNewTeacher = async (tid, name, password) => {
  if (!/^\S{5,}$/.test(tid)) {
    throw createValidationError('teacher_id_invalid', 'Invalid teacher ID');
  }
  // if (!/^\S+$/.test(name)) {
  //   throw createValidationError('teacher_name_invalid', 'Teacher name is incorrect');
  // }
  // if (!/^\S{5,}$/.test(password)) {
  //   throw createValidationError('teacher_id_passoword', 'Teacher password is incorrect');
  // }
  await makeQuery(INSERT_TEACHER(tid, name, password), databasePermissions.ADMIN);

  return { tid, name, password };
};

module.exports.getTeacherDetails = async (tid) => {
  if (!/^\S{5,}$/.test(tid)) {
    throw createValidationError('teacher_id_invalid', 'The requested teacher id format is incorrect');
  }
  const { data } = await makeQuery(SELECT_TEACHER_BY_TID(tid), databasePermissions.TEACHER);
  if (data.length <= 0) {
    throw createPermissionError('teacher_id_notfound', 'The teacher ID entered is not present');
  }
  return data[0];
};
