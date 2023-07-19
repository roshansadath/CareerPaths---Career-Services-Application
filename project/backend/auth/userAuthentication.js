const bcrypt= require('bcrypt');
const User= require('../model/user');
const { generateToken }=require('../middleware/jwt');

exports.authenticateUser=async(username,password)=>{
    try{
        const user=await User.findOne({where:{ username }})

        if (!user){
            return null;
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return null;
        }

        return user;
    }catch(error){
        console.error('Authentication Failed');
    }
};