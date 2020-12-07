const express = require('express');
const { getStudentDetailsController, getStudentCoursesController } = require('../controllers/StudentController');

const router = express.Router();
router.get('/details', getStudentDetailsController);
router.get('/courses', getStudentCoursesController);

module.exports = router;
