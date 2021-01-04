const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');
const { getCoursesFromUid } = require('../sql/courses');

module.exports.getMyStudentDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, res);
}];

module.exports.getAllStudentoursesController = [async (req, res) => {
  const { uid } = req.user;
  try {
    const classes = await getCoursesFromUid(uid);
    successResponseWithData(res, classes);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
