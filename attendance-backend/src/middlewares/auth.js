const { unauthorizedResponse } = require('../helpers/response');
const { getAdminDetails } = require('../sql/admins');
const { createPermissionError } = require('../helpers/errors');
const { getTeacherDetails } = require('../sql/teachers');

exports.adminAuth = async (req, res, next) => {
  const { 'x-user-id': id, 'x-user-password': password } = req.headers;
  if (id === undefined || password === undefined) {
    unauthorizedResponse(res, createPermissionError('admin_credentials_missing', 'Admin not authorized'));
    return;
  }
  try {
    const user = await getAdminDetails(id);
    req.user = user;
    if (user.password !== password) {
      unauthorizedResponse(res, createPermissionError('admin_password_mismatch', 'Admin password does not match'));
      return;
    }
    next();
  } catch (e) {
    unauthorizedResponse(res, e);
  }
};

exports.teacherAuth = async (req, res, next) => {
  const { 'x-user-id': id, 'x-user-password': password } = req.headers;
  if (id === undefined || password === undefined) {
    unauthorizedResponse(res, createPermissionError('teacher_credentials_missing', 'Teacher not authorized'));
    return;
  }
  try {
    const user = await getTeacherDetails(id);
    req.user = user;
    if (user.password !== password) {
      unauthorizedResponse(res, createPermissionError('teacher_password_mismatch', 'Teacher password does not match'));
      return;
    }
    next();
  } catch (e) {
    unauthorizedResponse(res, e);
  }
};
