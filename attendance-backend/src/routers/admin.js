const express = require('express');
const {
  postAdminTeacherRegisterController,
  postAdminCreateCourseController,
  getAdminAllTeachersController,
  postAdminCreateClassController,
} = require('../controllers/AdminController');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(adminAuth);

/** admin section */
/**
 * path : /admins/teachers
 *
 * request  :  { tid, name, password }
 *
 * response :  201 CREATED RESPONSE-USER
 */
router.post('/teachers', postAdminTeacherRegisterController);

/** admin section */
/**
 * path : /admins/teachers
 *
 * request  :  {}
 *
 * response :  200 OK RESPONSE-TEACHER-LIST
 */
router.get('/teachers', getAdminAllTeachersController);

/**
 * path: /admins/courses
 *
 * request : { courseCode,courseName,courseHoursLecture, courseHoursTutorial,
 *              courseHoursPractical, courseCredits, courseDescription  }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/courses', postAdminCreateCourseController);

/**
 * path: /admins/classes
 *
 * request : { classID, semester, section, tid }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/classes', postAdminCreateClassController);

module.exports = router;
