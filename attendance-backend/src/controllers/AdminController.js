const {
  createdResponseWithData, conflictResponse, successResponseWithData,
} = require('../helpers/response');
const { createNewStudent } = require('../sql/students');

const { createNewTeacher, getAllTeachers } = require('../sql/teachers');
const { createCourse, getAllCourses, getCoursesFromClass } = require('../sql/courses');
const { createClass, getAllClasses } = require('../sql/classes');
const { getAllEnrollment, createEnrollment } = require('../sql/enrollments');
const { createSlot, getAllSlots } = require('../sql/slots');
const { getTimeTableFromClass, createTimtableEntry } = require('../sql/timetables');

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
    const courses = await getAllCourses();
    successResponseWithData(res, courses);
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

module.exports.getAdminTimetableFromClassController = [async (req, res) => {
  try {
    const {
      classID,
    } = req.params;
    const timetable = await getTimeTableFromClass(classID);
    successResponseWithData(res, timetable);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.postAdminCreateTimetableEntryFromClassController = [async (req, res) => {
  try {
    const {
      classID,
    } = req.params;
    const {
      day,
      slotID,
      courseID,
    } = req.body;
    const timetableEntry = await createTimtableEntry(classID, day, slotID, courseID);
    createdResponseWithData(res, timetableEntry);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAdminCoursesFromClassController = [async (req, res) => {
  try {
    const {
      classID,
    } = req.params;
    const courses = await getCoursesFromClass(classID);
    successResponseWithData(res, courses);
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

/* slots section */
module.exports.postAdminCreateSlotController = [async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;

    const slot = await createSlot(name, startTime, endTime);
    createdResponseWithData(res, slot);
  } catch (error) {
    conflictResponse(res, error);
  }
}];

module.exports.getAdminAllSlotsController = [async (req, res) => {
  try {
    const slots = await getAllSlots();
    successResponseWithData(res, slots);
  } catch (error) {
    conflictResponse(res, error);
  }
}];
