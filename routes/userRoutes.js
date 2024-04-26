const express = require('express');
const { createUser, loginController } = require('../controllers/userLoginController');

const router = express.Router();

router.post('/create-account', createUser)
router.post('/login-account' , loginController)

module.exports = router;