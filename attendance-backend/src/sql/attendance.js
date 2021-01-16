const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

// queries
const SELECT_ALL_ATTENDANCE_BY_CLASS_AND_COURSE = (classID, courseID) => `SELECT A.attendanceID, 
DATE_FORMAT(A.date, '%m/%d/%Y %h:%i %p') as date, TIME_FORMAT(S.startTime, '%h:%i %p') as startTime, TIME_FORMAT(S.endTime, '%h:%i %p') as endTime
 FROM ATTENDANCE A JOIN SLOT S ON  A.slotID = S.slotID WHERE classID='${classID}' and courseID='${courseID}'`;

const SELECT_ATTENDANCE_BY_ATTENDANCE_ID_TEACHER = (classID, courseID, attendanceID) => `SELECT * FROM ATTENDANCE_DETAIL 
    WHERE classID='${classID}' and courseID='${courseID}' and attendanceID='${attendanceID}'`;

const SELECT_STUDENT_ATTENDANCE_BY_ATTENDANCE_ID = (attendanceID) => `SELECT * FROM STUD_ATTENDANCE WHERE attendanceID='${attendanceID}'`;

// executors
module.exports.getAttendanceFromClassAndCourse = async (classID, courseID) => {
  const { data: attendences } = await makeQuery(
    SELECT_ALL_ATTENDANCE_BY_CLASS_AND_COURSE(classID, courseID), databasePermissions.TEACHER,
  );
  return attendences;
};

module.exports.getAttendanceDetailFromClassAndCourse = async (classID, courseID, attendanceID) => {
  const { data: detail } = await makeQuery(
    SELECT_ATTENDANCE_BY_ATTENDANCE_ID_TEACHER(classID, courseID, attendanceID),
    databasePermissions.TEACHER,
  );
  return detail[0];
};

module.exports.getAllAttendanceOfStudentFromId = async (attendanceID) => {
  const { data: students } = await makeQuery(
    SELECT_STUDENT_ATTENDANCE_BY_ATTENDANCE_ID(attendanceID),
    databasePermissions.TEACHER,
  );
  return students;
};
