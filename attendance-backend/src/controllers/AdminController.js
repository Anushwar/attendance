const {
  createdResponseWithData, conflictResponse,
} = require('../helpers/response');

const { createNewTeacher } = require('../sql/teachers');
const { createCourse } = require('../sql/admins');

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
