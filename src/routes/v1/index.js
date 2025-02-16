const express = require('express');
const { InfoController } = require('../../controllers');
const router = express.Router();


console.log("------info---")

router.get('/info',InfoController.info);




module.exports = router