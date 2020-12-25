const express = require('express');
const { getStudentDetailsController, getStudentCoursesController } = require('../controllers/StudentController');
const { studentAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(studentAuth);

/**
 * path : /students/me
 *
 * request  :  { uid }
 *
 * response :  200 OK Response
 */
router.get('/details', getStudentDetailsController);
router.get('/courses', getStudentCoursesController);

module.exports = router;
