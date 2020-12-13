const connection = require('../db/db');

const { databasePermissions } = require('./constants');

const {
  // ROOT user
  SQL_USER: user,
  SQL_PASSWORD: password,
  // admin login
  SQL_ADMIN_USER: adminUser,
  SQL_ADMIN_PASSWORD: adminPassword,
  // teacher login
  SQL_TEACHER_USER: teacherUser,
  SQL_TEACHER_PASSWORD: teacherPassword,
} = process.env;

const getDbmsUserFromPermissionLevel = (permissionLevel) => {
  switch (permissionLevel) {
    case databasePermissions.ROOT:
      return { user, password };
    case databasePermissions.ADMIN:
      return { user: adminUser, password: adminPassword };
    case databasePermissions.TEACHER:
      return { user: teacherUser, password: teacherPassword };
    default:
    case databasePermissions.NONE:
      throw new Error('No permissions to access database');
  }
};

module.exports = (query, permissionLevel) => new Promise((resolve, reject) => {
  const dbmsUser = getDbmsUserFromPermissionLevel(permissionLevel);
  if (connection.user !== dbmsUser.user) {
    connection.changeUser({
      user: dbmsUser.user,
      password: dbmsUser.password,
    });
  }
  connection.query(query, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve({ data: results, fields });
  });
});
