const express = require('express');
const { postAdminRegisterController, postAdminLoginController } = require('../controllers/UserController');

const router = express.Router();

/** admin section */
/**
 * request  :  { uid, name, role, password }
 *
 * response :  201 CREATED EMPTY-RESPONSE
 */
router.post('/admins/register', postAdminRegisterController);

/**
 * request  :  { uid, password }
 *
 * response :  200 OK {uid, name, role, password}
 */
router.post('/admins/login', postAdminLoginController);
/** admin section */

module.exports = router;
