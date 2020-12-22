const express = require('express');
const { postAdminLoginController, postTeacherLoginController } = require('../controllers/AuthController');

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

module.exports = router;
