const express = require('express');

const {check} = require('express-validator');

const UserController = require('../controllers/user-controllers');

const router = express.Router();

router.post('/signup'
,[check('username').not().isEmpty(),
  check('password').not().isEmpty(),
  check('email').not().isEmpty()
 ] 
,UserController.UserSignUp);

router.post('/login', UserController.login)

module.exports = router;