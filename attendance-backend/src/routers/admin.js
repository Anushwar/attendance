const express = require('express');
const { postAdminTeacherRegisterController } = require('../controllers/AdminController');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(adminAuth);

/** admin section */
/**
 * request  :  { tid, name, password }
 *
 * response :  201 CREATED EMPTY-RESPONSE
 */
router.post('/teachers', postAdminTeacherRegisterController);

module.exports = router;
