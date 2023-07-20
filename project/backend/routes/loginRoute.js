const express = require('express');
const router = express.Router();
loginController= require('../controllers/loginController');

router.post('/',loginController.login);
module.exports=router;