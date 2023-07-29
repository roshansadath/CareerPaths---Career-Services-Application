const multer = require('multer');
const User= require('../model/user');

//Setting up the storage for the files:
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,'cv-'+ uniqueSuffix + path.extname(file.originalname));
    },
});

const upload=multer({storage:storage}).single('cvFile');

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
        
        //Handling CV upload if any.
        upload(req,res,async(err)=>{
            if(err){
                console.error('Error uploading CV',err);
                return res.json(newUser);
            }
            //If CV uploaded successfully
            if(req.file){
                newUser.cvUrl=req.file.path;
                await newUser.save();
            }

            res.json(newUser);
        });

    }catch(error){
        console.error('Error adding user:',error);
        res.status(500).json({error:"Error occured while adding the user"});
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

        //Handle the CV update
        upload(req,res,async(err)=>{
            if (err){
                console.error('Error uploading CV',err);
                //Even if CV update fails update rest
                await user.save();
                return res.json(user);
            }
            //If CV uploaded successfulling change the cvUrl in the database.
            if(req.file){
                user.cvUrl=req.file.path;
            }
            //save the updated user to the database
            await user.save();
            res.json(user);
        });

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