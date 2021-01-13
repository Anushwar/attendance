const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');
const { getCoursesFromTid, getCoursesForTodayFromTid } = require('../sql/courses');

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
