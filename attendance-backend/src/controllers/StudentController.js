const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');

const { getCoursesFromUid, getCourseDetailsFromUid } = require('../sql/courses');

const { getAttendanceDetails } = require('../sql/attendance');

module.exports.getMyStudentDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, res);
}];

module.exports.getAllStudentCoursesController = [async (req, res) => {
  const { uid } = req.user;
  try {
    const classes = await getCoursesFromUid(uid);
    successResponseWithData(res, classes);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getStudentCourseDetailsFromClassController = [async (req, res) => {
  const { courseID } = req.params;
  const { uid } = req.user;
  try {
    const course = await getCourseDetailsFromUid(courseID, uid);
    successResponseWithData(res, course);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getStudentAttendanceDetailsController = [async (req, res) => {
  const { courseID } = req.params;
  const { uid } = req.user;
  try {
    const attendances = await getAttendanceDetails(courseID, uid);
    successResponseWithData(res, attendances);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
