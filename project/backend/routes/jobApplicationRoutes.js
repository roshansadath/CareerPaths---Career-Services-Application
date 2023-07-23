const express = require('express');
const router = express.Router();
const jobApplicationController =require('../controllers/jobApplicationController');
const {authenticateToken}=require('../middleware/jwt');
//To get job post specific job application.
router.get('/jobpost/:id',jobApplicationController.getJobPostJobApplications);

//Candidate specific job applications
router.get('/',authenticateToken,jobApplicationController.getUserJobApplications);

router.get('/getalljobapplication',jobApplicationController.getAllJobApplications);
router.get('/:id',jobApplicationController.getJobApplication);
router.post('/',jobApplicationController.createJobApplication);
router.put('/:id',jobApplicationController.updateJobApplication);
router.delete('/:id',jobApplicationController.deleteJobApplication);

module.exports=router;