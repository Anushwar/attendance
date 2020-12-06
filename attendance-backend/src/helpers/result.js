const connection = require('../db/db');

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

module.exports = (query) => new Promise((resolve, reject) => {
  connection.changeUser({ user, password });
  connection.query(query, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve({ data: results, fields });
  });
});

module.exports.makeAdminQuery = (query) => new Promise((resolve, reject) => {
  connection.changeUser({ user: adminUser, password: adminPassword });
  connection.query(query, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve({ data: results, fields });
  });
});

module.exports.makeTeacherQuery = (query) => new Promise((resolve, reject) => {
  connection.changeUser({ user: teacherUser, password: teacherPassword });
  connection.query(query, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve({ data: results, fields });
  });
});
