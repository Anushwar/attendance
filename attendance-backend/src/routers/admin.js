const express = require('express');
const { postAdminTeacherRegisterController, postAdminStudentRegisterController } = require('../controllers/AdminController');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(adminAuth);

/** admin section */
/**
 * path : /admins/teachers
 *
 * request  :  { tid, name, password }
 *
 * response :  201 CREATED RESPONSE-USER
 */
router.post('/teachers', postAdminTeacherRegisterController);
router.post('/students', postAdminStudentRegisterController);

module.exports = router;
