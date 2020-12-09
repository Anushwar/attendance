const {
  createdResponseWithData, errorResponse,
} = require('../helpers/response');

const { createNewTeacher } = require('../sql/teachers');

module.exports.postAdminTeacherRegisterController = [async (req, res) => {
  try {
    const {
      tid, name, password,
    } = req.body;
    const teacher = await createNewTeacher(tid, name, password);
    createdResponseWithData(res, teacher);
  } catch (error) {
    errorResponse(res, error);
  }
}];
