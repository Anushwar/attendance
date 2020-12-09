const {
  successResponseWithData, errorResponse,
} = require('../helpers/response');

const { getAdminDetails } = require('../sql/admins');
const { createPermissionError } = require('../helpers/errors');

module.exports.postAdminLoginController = [async (req, res) => {
  try {
    const {
      aid, password,
    } = req.body;
    const admin = await getAdminDetails(aid);
    if (admin.password !== password) {
      throw createPermissionError('admin_password_mismatch', 'Admin password does not match');
    }
    successResponseWithData(res, admin);
  } catch (error) {
    errorResponse(res, error);
  }
}];
