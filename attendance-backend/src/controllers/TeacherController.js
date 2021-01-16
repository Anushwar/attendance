const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');

const {
  getCoursesFromTid,
  getCoursesForTodayFromTid,
  getCourseDetailsFromClassAndCourse,
} = require('../sql/courses');

const {
  getAttendanceFromClassAndCourse,
  getAttendanceDetailFromClassAndCourse,
  getAllAttendanceOfStudentFromId,
  createAttendanceEntry,
} = require('../sql/attendance');

const {
  getStudentsOfTeacher,
} = require('../sql/students');

module.exports.getMyTeacherDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, req.user);
}];

module.exports.getAllTeacherCoursesController = [async (req, res) => {
  const { tid } = req.user;
  try {
    const courses = await getCoursesFromTid(tid);
    successResponseWithData(res, courses);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAllTeacherCoursesForTodayController = [async (req, res) => {
  const { tid } = req.user;
  try {
    const courses = await getCoursesForTodayFromTid(tid);
    successResponseWithData(res, courses);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getTeacherCourseDetailsFromClassController = [async (req, res) => {
  const { classID, courseID } = req.params;
  try {
    const course = await getCourseDetailsFromClassAndCourse(classID, courseID);
    successResponseWithData(res, course);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getTeacherAttendanceFromClassController = [async (req, res) => {
  const { classID, courseID } = req.params;
  try {
    const attendance = await getAttendanceFromClassAndCourse(classID, courseID);
    successResponseWithData(res, attendance);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getTeacherStudentFromClassController = [async (req, res) => {
  const { classID, courseID } = req.params;
  try {
    const students = await getStudentsOfTeacher(classID, courseID);
    successResponseWithData(res, students);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getTeacherAttendanceDetailsController = [async (req, res) => {
  const { classID, courseID, attendanceID } = req.params;
  try {
    const attendence = await getAttendanceDetailFromClassAndCourse(
      classID, courseID, attendanceID,
    );
    successResponseWithData(res, attendence);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getTeacherAllAttendanceOfStudent = [async (req, res) => {
  const { attendanceID } = req.params;
  try {
    const students = await getAllAttendanceOfStudentFromId(attendanceID);
    successResponseWithData(res, students);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.postTeacherAttendanceController = [async (req, res) => {
  const {
    classID, courseID, slotID, students,
  } = req.body;
  try {
    const meta = await createAttendanceEntry(classID, courseID, slotID, students);
    successResponseWithData(res, meta);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
