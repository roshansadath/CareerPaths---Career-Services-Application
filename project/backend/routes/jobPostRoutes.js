const express = require('express');
const router = express.Router();
const jobPostController =require('../controllers/jobPostController');
const {authenticateToken}=require('../middleware/jwt');

//To get job posted by the particular user.
router.get('/',authenticateToken,jobPostController.getUserJobPost);

router.get('/alljobpost',jobPostController.getAllJobPosts);
router.get('/:id',jobPostController.getJobPost);
router.post('/',authenticateToken,jobPostController.createJobPost);
router.put('/:id',jobPostController.updateJobPost);
router.delete('/:id',jobPostController.deleteJobPost);

module.exports=router;