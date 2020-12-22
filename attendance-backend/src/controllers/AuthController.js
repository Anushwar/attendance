const {
  successResponseWithData, unauthorizedResponse,
} = require('../helpers/response');

const { getAdminDetails } = require('../sql/admins');
const { createPermissionError } = require('../helpers/errors');
const { getTeacherDetails } = require('../sql/teachers');

// admin section
module.exports.postAdminLoginController = [async (req, res) => {
  try {
    const {
      aid, password,
    } = req.body;
    const admin = await getAdminDetails(aid);
    if (admin.password !== password) {
      throw createPermissionError('admin_password_mismatch', 'Admin password does not match');
    }
    delete admin.password;
    successResponseWithData(res, admin);
  } catch (error) {
    unauthorizedResponse(res, error);
  }
}];

// teacher section
module.exports.postTeacherLoginController = [async (req, res) => {
  try {
    const {
      tid, password,
    } = req.body;
    const teacher = await getTeacherDetails(tid);
    if (teacher.password !== password) {
      throw createPermissionError('teacher_password_mismatch', 'Teacher password does not match');
    }
    delete teacher.password;
    successResponseWithData(res, teacher);
  } catch (error) {
    unauthorizedResponse(res, error);
  }
}];
