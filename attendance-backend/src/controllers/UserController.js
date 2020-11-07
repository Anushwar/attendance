const {
  createdResponse, successResponseWithData, validationErrorResponse, errorResponse,
} = require('../helpers/response');
const { createNewUser, getUserDetails } = require('../sql/users');

module.exports.postAdminRegisterController = [async (req, res) => {
  try {
    const {
      uid, name, role, password,
    } = req.body;
    await createNewUser(uid, name, role, password);
    createdResponse(res);
  } catch (error) {
    errorResponse(res, error);
  }
}];

module.exports.postAdminLoginController = [async (req, res) => {
  try {
    const {
      uid,
      password,
    } = req.body;
    const user = await getUserDetails(uid);
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    successResponseWithData(res, user);
  } catch (error) {
    validationErrorResponse(res, error);
  }
}];
