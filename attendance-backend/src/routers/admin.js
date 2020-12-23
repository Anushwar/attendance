const express = require('express');
const { postAdminTeacherRegisterController, postAdminCreateCourseController } = require('../controllers/AdminController');
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

/**
 * path: /admins/courses
 *
 * request : { courseCode,courseName,courseHoursLecture, courseHoursTutorial,
 *              courseHoursPractical, courseCredits, courseDescription  }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/courses', postAdminCreateCourseController);

module.exports = router;
