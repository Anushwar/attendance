const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createValidationError } = require('../helpers/errors');

// queries
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

const SELECT_ALL_COURSE = () => 'SELECT * FROM COURSE;';

const SELECT_COURSE_DETAILS_FROM_TID = (tid) => `SELECT C.classID, C.semester, C.section, CO.courseID, CO.courseName from COURSE CO,
CLASS C WHERE courseID IN (select courseID FROM ENROLLMENT WHERE tid ='${tid}' AND c.classID = classID )`;

// executors
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
module.exports.getAllCourses = async () => {
  const { data: courses } = await makeQuery(SELECT_ALL_COURSE(), databasePermissions.ADMIN);
  return courses;
};

module.exports.getCoursesFromTid = async (tid) => {
  if (!/^\S{5,}$/.test(tid)) {
    throw createValidationError('teacher_id_invalid', 'The requested teacher id format is incorrect');
  }
  const { data: classes } = await makeQuery(
    SELECT_COURSE_DETAILS_FROM_TID(tid), databasePermissions.TEACHER,
  );
  return classes;
};
