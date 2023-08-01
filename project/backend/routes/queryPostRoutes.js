const express = require('express');
const router = express.Router();
const {authenticateToken}=require('../middleware/jwt');
const queryPostController=require('../controllers/queryPostController');

router.post('/',authenticateToken,queryPostController.createQueryPost);

module.exports=router;