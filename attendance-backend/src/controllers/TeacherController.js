const {
  successResponseWithData, conflictResponse,
} = require('../helpers/response');
const { getClassesFromTid } = require('../sql/classes');

module.exports.getMyTeacherDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, req.user);
}];

module.exports.getAllTeacherClassesController = [async (req, res) => {
  const { tid } = req.user;
  try {
    const classes = await getClassesFromTid(tid);
    successResponseWithData(res, classes);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
