const express = require('express');
const { InfoController } = require('../../controllers');
const userRouter = require('./user-routes');
const { UserMiddlewares } = require('../../middlewares');

const router = express.Router();


router.get('/info', UserMiddlewares.checkAuth, InfoController.info);


router.use('/user', userRouter)


module.exports = router