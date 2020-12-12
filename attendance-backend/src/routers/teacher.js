const express = require('express');
const { getMyTeacherDetailsController } = require('../controllers/TeacherController');
const { teacherAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(teacherAuth);

/**
 * path : /teachers/me
 *
 * request  :  { tid }
 *
 * response :  200 OK Response
 */
router.get('/me', getMyTeacherDetailsController);

module.exports = router;
