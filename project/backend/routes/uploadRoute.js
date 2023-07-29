const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/jwt');
const uploadController=require('../controllers/uploadController');

router.put('/uploadcv',authenticateToken,uploadController.updateCv);
router.get('/viewcv/:cvFileName',uploadController.displayCv);

module.exports=router;