const express = require('express');
const { postAdminLoginController, postTeacherLoginConttroller } = require('../controllers/AuthController');

const router = express.Router();

/**
 * request  :  { aid, password }
 *
 * response :  200 OK RESPONSE-USER
 */
router.post('/admin/login', postAdminLoginController);

router.post('/teacher/login', postTeacherLoginConttroller);

module.exports = router;
