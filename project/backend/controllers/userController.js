const User= require('../model/user');
const formidable = require('formidable');
const fs=require('fs');
const path=require('path');
const { v4:uuidv4 }=require('uuid');



//To get user data that has logged in.
module.exports.getProfile=async (req,res,next)=>{
    try{
        const user=await User.findByPk(req.user.userId);
        res.json(user);
    }catch (error){
        next(error);
    }
};

module.exports.getAllUsers= async (req,res,next)=>{
    try{
        const users=await User.findAll({
            attributes:{exclude:['password']},
    });
        res.json(users);
    }catch (error){
        next(error);
    }
};

module.exports.getUser=async (req,res,next)=>{
    const { id }=req.params;
    try{
        const user=await User.findByPk(id);
        if (!user){
            return res.status(404).json({error:'User not found'});
        }
        res.json(user);
    }catch(error){
        next(error);
    }
}
// // Define a function to handle form data and file upload
// function handleFormUpload(req, res) {
//     const form = new formidable.IncomingForm();
  
//     // Parse the form data
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         res.writeHead(400, { 'Content-Type': 'text/plain' });
//         res.end('Error parsing the form data.');
//         return;
//       }
//       const name = fields.name;
//       console.log('Name:'+name);
//       // Access the form fields and uploaded file information
//       const uploadedFile = files.cvFile;
//       console.log(uploadedFile.path);
//       const fileName = uploadedFile[0].originalFilename;
//       const fileSize = uploadedFile.size;
//       const temporaryPath = uploadedFile.path;
  
//       // Here, you can process the uploaded file, move it to a desired location, etc.
//       // For demonstration purposes, we'll just return a simple response with file information.
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.write(`File name: ${fileName}\n`);
//       res.write(`File size: ${fileSize} bytes\n`);
//       res.write(`Temporary path: ${temporaryPath}\n`);
//       res.end('File upload successful!');
//     });
//   }

module.exports.createUser=async(req,res,next)=>{
    try{      
        const { username,password,name, email,userType }=req.body;
        console.log('Check:>>>>>>>>>>'+username+' '+password+' '+name+' '+email+' ');
        //Create a newUser
        const newUser=await User.create({
            username,
            password,
            name,
            email,
            userType,
            cvUrl:null,
        });
        res.json({message:'User added successfully.'});
     }catch(error){
        console.error('Error adding user',error);
        res.status(500).send('Error adding user.');
     } 
};

  


module.exports.updateUser=async(req,res,next)=>{
    try{
        const{ id }=req.params; //id from request parameters.
        const{username,name,email,userType}=req.body;

        //Find by PK.
        const user=await User.findByPk(id);

        //User not found case.
        if(!user){
            return res.status(404).json({error:'User not found'});
        }

        //Update user's information
        user.username=username;
        user.name=name;
        user.email=email;
        user.userType=userType;

        await user.save();
        res.json({message:'User updated successfully.'});
        

    }catch(error){
        console.error('Error updating a user',error);
        res.status(500).json({error:'Error occured while updating a user'})
    }

    
    
};

module.exports.deleteUser=async(req,res,next)=>{
    try{
        const{ id }=req.params; //id from request parameters.

        //Find by PK.
        const user=await User.findByPk(id);

        //User not found case.
        if(!user){
            return res.status(404).json({error:'User not found'});
        }

        //Delete the user from the database.
        await user.destroy();

        res.json({message:'User Deleted Successfully.'})

    }catch(error){
        console.error('Error Deleting a user',error);
        res.status(500).json({error:'Error occured while deleting a user'})
    }
};