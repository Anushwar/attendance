const {
  createdResponseWithData, conflictResponse, successResponseWithData,
} = require('../helpers/response');
const { createNewStudent, getAllStudents } = require('../sql/students');

const { createNewTeacher, getAllTeachers } = require('../sql/teachers');
const { createCourse, getAllCourses } = require('../sql/courses');
const { createClass, getAllClasses } = require('../sql/classes');
const { getAllEnrollment, createEnrollment } = require('../sql/enrollments');
const { createEnlistment, getAllEnlistment } = require('../sql/enlistment');

/* teacher section  */
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

module.exports.getAdminAllTeachersController = [async (req, res) => {
  try {
    const teachers = (await getAllTeachers()).map(({ password, ...teacher }) => teacher);
    successResponseWithData(res, teachers);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

/* Course section  */
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

module.exports.getAdminAllCourseController = [async (req, res) => {
  try {
    const classes = await getAllCourses();
    successResponseWithData(res, classes);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

/* class section */
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

module.exports.getAdminAllClassesController = [async (req, res) => {
  try {
    const classes = await getAllClasses();
    successResponseWithData(res, classes);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

/* enrollment section */
module.exports.postAdminCreateEnrollmentController = [async (req, res) => {
  try {
    const {
      classID, courseID, tid,
    } = req.body;
    const enrollment = await createEnrollment(classID, courseID, tid);
    createdResponseWithData(res, enrollment);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAdminAllEnrollmentController = [async (req, res) => {
  try {
    const enrollments = await getAllEnrollment();
    successResponseWithData(res, enrollments);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

/* student section */
module.exports.postAdminStudentRegisterController = [async (req, res) => {
  try {
    const {
      uid, name, password,
    } = req.body;
    const student = await createNewStudent(uid, name, password);
    delete student.password;
    createdResponseWithData(res, student);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAdminAllStudentsController = [async (req, res) => {
  try {
    const students = (await getAllStudents()).map(({ password, ...student }) => student);
    successResponseWithData(res, students);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

/* enlistment section */
module.exports.postAdminCreateEnlitmentController = [async (req, res) => {
  try {
    const {
      classID, courseID, uid,
    } = req.body;
    const enrollment = await createEnlistment(classID, courseID, uid);
    createdResponseWithData(res, enrollment);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAdminAllEnlistmentController = [async (req, res) => {
  try {
    const enrollments = await getAllEnlistment();
    successResponseWithData(res, enrollments);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
