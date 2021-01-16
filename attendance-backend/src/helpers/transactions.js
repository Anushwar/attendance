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
  // student login
  SQL_STUDENT_USER: studentUser,
  SQL_STUDENT_PASSWORD: studentPassword,
} = process.env;

const getDbmsUserFromPermissionLevel = (permissionLevel) => {
  switch (permissionLevel) {
    case databasePermissions.ROOT:
      return { user, password };
    case databasePermissions.ADMIN:
      return { user: adminUser, password: adminPassword };
    case databasePermissions.TEACHER:
      return { user: teacherUser, password: teacherPassword };
    case databasePermissions.STUDENT:
      return { user: studentUser, password: studentPassword };
    default:
    case databasePermissions.NONE:
      throw new Error('No permissions to access database');
  }
};

module.exports.beginTransaction = (permissionLevel) => new Promise((resolve, reject) => {
  const dbmsUser = getDbmsUserFromPermissionLevel(permissionLevel);
  if (connection.user !== dbmsUser.user) {
    connection.changeUser({
      user: dbmsUser.user,
      password: dbmsUser.password,
    });
  }
  connection.beginTransaction((err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});

module.exports.commit = new Promise((resolve, reject) => {
  connection.commit((error) => {
    if (error) {
      reject(error);
      return;
    }
    resolve();
  });
});

module.exports.rollback = new Promise((resolve, reject) => {
  connection.rollback((error) => {
    if (error) {
      reject(error);
      return;
    }
    resolve();
  });
});
