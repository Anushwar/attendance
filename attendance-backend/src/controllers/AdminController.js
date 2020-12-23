const {
  createdResponseWithData, conflictResponse, successResponseWithData,
} = require('../helpers/response');

const { createNewTeacher } = require('../sql/teachers');
const { createCourse, getAllTeachers, createClass } = require('../sql/admins');

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

module.exports.postAdminCreateCourseController = [async (req, res) => {
  try {
    const {
      courseCode,
      courseName,
      courseHoursLecture,
      courseHoursTutorial,
      courseHoursPractical,
      courseCredits,
      courseDescription,
    } = req.body;
    const course = await createCourse(courseCode,
      courseName,
      courseHoursLecture,
      courseHoursTutorial,
      courseHoursPractical,
      courseCredits,
      courseDescription);
    createdResponseWithData(res, course);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAdminAllTeachersController = [async (req, res) => {
  try {
    const teachers = (await getAllTeachers()).map(({ password, ...teacher }) => teacher);
    successResponseWithData(res, teachers);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.postAdminCreateClassController = [async (req, res) => {
  const {
    classID, semester, section, tid,
  } = req.body;
  try {
    const newClass = await createClass(classID, semester, section, tid);
    createdResponseWithData(res, newClass);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
