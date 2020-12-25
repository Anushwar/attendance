const express = require('express');
const { getMyTeacherDetailsController, getAllTeacherClassesController } = require('../controllers/TeacherController');
const { teacherAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(teacherAuth);

/**
 * path : /teachers/me
 *
 * request  :  EMPTY
 *
 * response :  200 OK Response
 */
router.get('/me', getMyTeacherDetailsController);

/**
 * path : /teachers/classes
 *
 * request  : EMPTY
 *
 * response :  200 OK Response
 */
router.get('/classes', getAllTeacherClassesController);

module.exports = router;
