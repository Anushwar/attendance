const express = require('express');
const { postAdminLoginController, postTeacherLoginController, postStudentLoginController } = require('../controllers/AuthController');

const router = express.Router();

/**
 * request  :  { aid, password }
 *
 * response :  200 OK RESPONSE-USER
 */
router.post('/admin/login', postAdminLoginController);

/**
 * request  :  { tid, password }
 *
 * response :  200 OK RESPONSE-USER
 */
router.post('/teacher/login', postTeacherLoginController);

/**
 * request  :  { uid, password }
 *
 * response :  200 OK RESPONSE-USER
 */
router.post('/students/login', postStudentLoginController);

module.exports = router;
