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
} = require('../sql/attendance');

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
