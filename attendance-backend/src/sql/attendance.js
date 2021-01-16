const uuid = require('uuid').v4;
const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { beginTransaction, commit, rollback } = require('../helpers/transactions');

// queries
const SELECT_ALL_ATTENDANCE_BY_CLASS_AND_COURSE = (classID, courseID) => `SELECT A.attendanceID, 
DATE_FORMAT(A.date, '%m/%d/%Y %h:%i %p - %W') as date, TIME_FORMAT(S.startTime, '%h:%i %p') as startTime, TIME_FORMAT(S.endTime, '%h:%i %p') as endTime
 FROM ATTENDANCE A JOIN SLOT S ON  A.slotID = S.slotID WHERE classID='${classID}' and courseID='${courseID}'`;

const SELECT_ATTENDANCE_BY_ATTENDANCE_ID_TEACHER = (classID, courseID, attendanceID) => `SELECT * FROM ATTENDANCE_DETAIL 
    WHERE classID='${classID}' and courseID='${courseID}' and attendanceID='${attendanceID}'`;

const SELECT_STUDENT_ATTENDANCE_BY_ATTENDANCE_ID = (attendanceID) => `SELECT S.*, SA.isPresent FROM STUD_ATTENDANCE SA JOIN STUDENT S ON S.uid=SA.uid  where SA.attendanceID='${attendanceID}'`;

const CREATE_ATTENDANCE = (attendanceID, classID, courseID, slotID) => `INSERT INTO ATTENDANCE VALUES ('${attendanceID}', '${classID}', '${courseID}','${slotID}', NOW())`;

const INSERT_INTO_STUD_ATTENDANCE = (attendanceID, uid, isPresent) => `INSERT INTO STUD_ATTENDANCE VALUES ('${attendanceID}', '${uid}', ${isPresent});`;

const GET_ATTENDANCE_FOR_COURSE_BY_UID = (courseID, uid) => `SELECT A.*, DATE_FORMAT(A.date, '%m/%d/%Y %h:%i %p') as date, 
    SA.isPresent, SA.uid, S.name, S.startTime, S.endTime FROM STUD_ATTENDANCE SA
    JOIN ATTENDANCE A
    ON 
    SA.attendanceID = A.attendanceID
    JOIN SLOT S
    ON
    S.slotID = A.slotID where courseID='${courseID}' and uid='${uid}'`;
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

module.exports.createAttendanceEntry = async (classID, courseID, slotID, students) => {
  try {
    await beginTransaction(databasePermissions.ROOT);
    const attendanceID = uuid();
    await makeQuery(
      CREATE_ATTENDANCE(attendanceID, classID, courseID, slotID), databasePermissions.TEACHER,
    );
    await Promise.all(students.map(async ({ uid, isPresent }) => {
      await makeQuery(INSERT_INTO_STUD_ATTENDANCE(attendanceID, uid, isPresent),
        databasePermissions.TEACHER);
    }));
    await commit;
    return { attendanceID };
  } catch (error) {
    await rollback;
    throw error;
  }
};

module.exports.getAttendanceDetails = async (courseID, uid) => {
  const { data: attendances } = await makeQuery(GET_ATTENDANCE_FOR_COURSE_BY_UID(courseID, uid),
    databasePermissions.STUDENT);
  return attendances;
};
