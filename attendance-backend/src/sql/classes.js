const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createValidationError } = require('../helpers/errors');

// queries
const INSERT_CLASS = (classID, semester, section, tid) => `INSERT INTO CLASS VALUES (
    '${classID}',
    ${semester},
    '${section}',
    '${tid}'
  );`;

const SELECT_ALL_CLASSES = () => 'SELECT * FROM CLASS;';

const SELECT_CLASS_DETAILS_FROM_TID = (tid) => `SELECT C.classID, C.semester, C.section, CO.courseID, CO.courseName from CLASS C,
 COURSE CO WHERE courseID IN (select courseID FROM ENROLLMENT WHERE tid ='${tid}' AND c.classID = classID )`;

// executors
module.exports.createClass = async (classID, semester, section, tid) => {
  await makeQuery(INSERT_CLASS(classID, semester, section, tid), databasePermissions.ADMIN);
  return {
    classID, semester, section, tid,
  };
};

module.exports.getAllClasses = async () => {
  const { data: classes } = await makeQuery(SELECT_ALL_CLASSES(), databasePermissions.ADMIN);
  return classes;
};

module.exports.getClassesFromTid = async (tid) => {
  if (!/^\S{5,}$/.test(tid)) {
    throw createValidationError('teacher_id_invalid', 'The requested teacher id format is incorrect');
  }
  const { data: classes } = await makeQuery(
    SELECT_CLASS_DETAILS_FROM_TID(tid), databasePermissions.TEACHER,
  );
  return classes;
};
