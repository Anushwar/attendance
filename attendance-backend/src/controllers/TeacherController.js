const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');
const { getCoursesFromTid } = require('../sql/courses');

module.exports.getMyTeacherDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, req.user);
}];

module.exports.getAllTeacherCoursesController = [async (req, res) => {
  const { tid } = req.user;
  try {
    const classes = await getCoursesFromTid(tid);
    successResponseWithData(res, classes);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
