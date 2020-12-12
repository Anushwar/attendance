const {
  successResponseWithData, errorResponse,
} = require('../helpers/response');

const { getTeacherDetails } = require('../sql/teachers');

module.exports.getMyTeacherDetailsController = [async (req, res) => {
  try {
    const {
      tid,
    } = req.body;
    const teacher = await getTeacherDetails(tid);
    delete teacher.password;
    successResponseWithData(res, teacher);
  } catch (error) {
    errorResponse(res, error);
  }
}];
