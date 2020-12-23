const {
  createdResponseWithData, conflictResponse,
} = require('../helpers/response');
const { createNewStudent } = require('../sql/students');

const { createNewTeacher } = require('../sql/teachers');

module.exports.postAdminTeacherRegisterController = [async (req, res) => {
  try {
    const {
      tid, name, password,
    } = req.body;
    const teacher = await createNewTeacher(tid, name, password);
    delete teacher.password;
    createdResponseWithData(res, teacher);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.postAdminStudentRegisterController = [async (req, res) => {
  try {
    const {
      uid, name, password,
    } = req.body;
    const student = await createNewStudent(uid, name, password);
    createdResponseWithData(res, student);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
