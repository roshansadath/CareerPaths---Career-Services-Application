const express = require('express');
const router = express.Router();
const {authenticateToken}=require('../middleware/jwt');
const queryPostController=require('../controllers/queryPostController');

router.post('/',authenticateToken,queryPostController.createQueryPost);
router.get('/:id',queryPostController.getQueryPost);
//Job Post Specific query post
router.get('/jobpost/:id',queryPostController.getJobPostQueryPost);
router.put('/:id',queryPostController.updateQueryPost);

module.exports=router;