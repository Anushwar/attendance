const {
  successResponseWithData,
} = require('../helpers/response');

module.exports.getMyStudentDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, res);
}];
