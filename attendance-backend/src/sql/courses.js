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
