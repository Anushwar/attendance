const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

// queries
const SELECT_ALL_ATTENDANCE_BY_CLASS_AND_COURSE = (classID, courseID) => `SELECT A.attendanceID, 
DATE_FORMAT(A.date, '%m/%d/%Y %h:%i %p') as date, TIME_FORMAT(S.startTime, '%h:%i %p') as startTime, TIME_FORMAT(S.endTime, '%h:%i %p') as endTime
 FROM ATTENDANCE A JOIN SLOT S ON  A.slotID = S.slotID WHERE classID='${classID}' and courseID='${courseID}'`;

// executors
module.exports.getAttendanceFromClassAndCourse = async (classID, courseID) => {
  const { data: attendences } = await makeQuery(
    SELECT_ALL_ATTENDANCE_BY_CLASS_AND_COURSE(classID, courseID), databasePermissions.TEACHER,
  );
  return attendences;
};
