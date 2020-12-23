const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createPermissionError, createValidationError } = require('../helpers/errors');

const SELECT_ADMIN_BY_AID = (aid) => `SELECT * FROM ADMIN WHERE aid='${aid}'`;

module.exports.getAdminDetails = async (aid) => {
  if (!/^\S{5,}$/.test(aid)) {
    throw createValidationError('admin_id_invalid', 'Invalid admin ID, id cannot be smaller than 5 characters');
  }
  const { data } = await makeQuery(
    SELECT_ADMIN_BY_AID(aid),
    databasePermissions.ADMIN,
  );
  if (data.length <= 0) {
    throw createPermissionError('admin_id_invalid', 'Admin not found');
  }
  return data[0];
};

const INSERT_COURSE = (courseCode,
  courseName,
  courseHoursLecture,
  courseHoursTutorial,
  courseHoursPractical,
  courseCredits,
  courseDescription) => `INSERT INTO COURSE VALUES (
    '${courseCode}',
    '${courseName}',
    ${courseHoursLecture},
    ${courseHoursTutorial},
    ${courseHoursPractical},
    ${courseCredits},
    '${courseDescription}'
  )`;

module.exports.createCourse = async (
  courseCode,
  courseName,
  courseHoursLecture,
  courseHoursTutorial,
  courseHoursPractical,
  courseCredits,
  courseDescription,
) => {
  if (!/^\S{5,}$/.test(courseCode)) {
    throw createValidationError('course_id_invalid', 'Invalid course ID, id cannot be smaller than 5 characters');
  }

  await makeQuery(INSERT_COURSE(
    courseCode,
    courseName,
    courseHoursLecture,
    courseHoursTutorial,
    courseHoursPractical,
    courseCredits,
    courseDescription,
  ), databasePermissions.ADMIN);

  return {
    courseCode,
    courseName,
    courseHoursLecture,
    courseHoursTutorial,
    courseHoursPractical,
    courseCredits,
    courseDescription,
  };
};

const SELECT_ALL_TEACHER = () => 'SELECT * FROM TEACHER;';

module.exports.getAllTeachers = async () => {
  const { data: teachers } = await makeQuery(SELECT_ALL_TEACHER(), databasePermissions.ADMIN);
  return teachers;
};

const INSERT_CLASS = (classID, semester, section, tid) => `INSERT INTO CLASS VALUES (
  '${classID}',
  ${semester},
  '${section}',
  '${tid}'
);`;

module.exports.createClass = async (classID, semester, section, tid) => {
  await makeQuery(INSERT_CLASS(classID, semester, section, tid), databasePermissions.ADMIN);

  return {
    classID, semester, section, tid,
  };
};
