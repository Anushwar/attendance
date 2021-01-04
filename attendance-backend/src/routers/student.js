const express = require('express');
const { getMyStudentDetailsController, getAllStudentoursesController } = require('../controllers/StudentController');
const { studentAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(studentAuth);

/**
 * path : /students/details
 *
 * request  :  EMPTY
 *
 * response :  200 OK Response
 */
router.get('/details', getMyStudentDetailsController);

/**
 * path : /students/courses
 *
 * request  :  EMPTY
 *
 * response :  200 OK Response
 */
router.get('/details', getAllStudentoursesController);

module.exports = router;
