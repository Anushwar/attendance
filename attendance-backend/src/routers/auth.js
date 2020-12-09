const express = require('express');
const { postAdminLoginController } = require('../controllers/AuthController');

const router = express.Router();

/**
 * request  :  { aid, password }
 *
 * response :  200 OK RESPONSE-USER
 */
router.post('/admin/login', postAdminLoginController);

module.exports = router;
