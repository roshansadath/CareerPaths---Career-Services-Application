const express = require('express');
const router = express.Router();
const userController =  require('../controllers/userController');
const {authenticateToken} = require('../middleware/jwt');

//To get profile of particular user.
router.get('/',authenticateToken,userController.getProfile);
router.get('/getalluser',userController.getAllUsers)
router.get('/:id',userController.getUser);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);


module.exports=router;