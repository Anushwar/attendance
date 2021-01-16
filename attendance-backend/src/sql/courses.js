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
CLASS C WHERE courseID IN (select courseID FROM ENROLLMENT WHERE tid ='${tid}' AND C.classID = classID )`;

const SELECT_COURSE_DETAILS_FROM_UID = (uid) => `SELECT C.classID, C.semester, C.section, CO.courseID, CO.courseName from COURSE CO,
CLASS C WHERE courseID IN (select courseID FROM STUD_ENLISTMENT WHERE uid ='${uid}' AND C.classID = (SELECT classID from STUDENT where uid = '${uid}') )`;

const SELECT_COURSE_DETAILS_FROM_CLASS_ID = (courseID) => `SELECT * FROM COURSE where courseID in (select courseID from ENROLLMENT where classID='${courseID}');`;

const SELECT_COURSE_DETAILS_FOR_UID = (courseID) => `SELECT *
FROM   ENLISTMENT_DETAIL
WHERE  courseid = '${courseID}'; `;

const SELECT_COURSE_DETAILS_FOR_TODAY_FROM_TID = (tid) => `SELECT C.classID, C.semester, C.section, CO.courseID, CO.courseName, 
TIME_FORMAT(s.startTime, '%h:%i %p') as startTime, TIME_FORMAT(s.endTime, '%h:%i %p') as endTime, S.slotID from COURSE CO,
CLASS C, slot S where courseID in (select courseID from TIMETABLE T where day=dayofweek(now()) and s.slotID = t.slotID and t.courseID in 
(select courseID FROM ENROLLMENT WHERE tid ='${tid}' AND c.classID = classID));`;

const SELECT_COURSE_DETAILS_FROM_CLASS_AND_COURSE = (classID, courseID) => `SELECT *
FROM   ENROLLMENT_DETAIL
WHERE  classid = '${classID}'
       AND courseid = '${courseID}'; `;

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
  const { data: courses } = await makeQuery(
    SELECT_COURSE_DETAILS_FROM_TID(tid), databasePermissions.TEACHER,
  );
  return courses;
};

module.exports.getCoursesForTodayFromTid = async (tid) => {
  if (!/^\S{5,}$/.test(tid)) {
    throw createValidationError('teacher_id_invalid', 'The requested teacher id format is incorrect');
  }
  const { data: courses } = await makeQuery(
    SELECT_COURSE_DETAILS_FOR_TODAY_FROM_TID(tid), databasePermissions.TEACHER,
  );
  return courses;
};

module.exports.getCoursesFromClass = async (classID) => {
  const { data: classes } = await makeQuery(
    SELECT_COURSE_DETAILS_FROM_CLASS_ID(classID), databasePermissions.ADMIN,
  );
  return classes;
};

module.exports.getCoursesFromUid = async (uid) => {
  if (!/^\S{5,}$/.test(uid)) {
    throw createValidationError('student_id_invalid', 'The requested student id format is incorrect');
  }
  const { data: classes } = await makeQuery(
    SELECT_COURSE_DETAILS_FROM_UID(uid), databasePermissions.STUDENT,
  );
  return classes;
};

module.exports.getCourseDetailsFromUid = async (courseID) => {
  const { data: course } = await makeQuery(
    SELECT_COURSE_DETAILS_FOR_UID(courseID),
    databasePermissions.STUDENT,
  );
  return course[0];
};

module.exports.getCourseDetailsFromClassAndCourse = async (classID, courseID) => {
  const { data: course } = await makeQuery(
    SELECT_COURSE_DETAILS_FROM_CLASS_AND_COURSE(classID, courseID),
    databasePermissions.TEACHER,
  );
  return course[0];
};
