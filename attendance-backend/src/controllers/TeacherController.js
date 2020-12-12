const {
  successResponseWithData,
} = require('../helpers/response');

module.exports.getMyTeacherDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, req.user);
}];
