const express = require('express');
const { getMyStudentDetailsController } = require('../controllers/StudentController');
const { studentAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(studentAuth);

/**
 * path : /students/details
 *
 * request  :  { uid }
 *
 * response :  200 OK Response
 */
router.get('/details', getMyStudentDetailsController);

module.exports = router;
