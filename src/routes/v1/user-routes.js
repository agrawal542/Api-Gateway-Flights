const express = require('express');
const { UserController } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');
const router = express.Router();

router.post('/signup', UserMiddlewares.validateUserSignup, UserController.signup);
router.post('/signin', UserMiddlewares.validateUserSignup, UserController.signin);


module.exports = router;