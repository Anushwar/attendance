const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');
const { getCoursesFromUid, getCourseDetailsFromUid } = require('../sql/courses');

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
