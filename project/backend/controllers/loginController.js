const { authenticateUser } = require("../auth/userAuthentication");
const { generateToken }=require('../middleware/jwt');

module.exports.login=async(req,res,next)=>{
    const {username,password}=req.body;
    const user=await authenticateUser(username,password);
    
    if(!user){
        return res.status(401).json({error: 'Invalid username or password' });
    } 
    const token=generateToken(user.userId);
    res.json({token});
}