const QueryPost=require('../model/queryPost');

module.exports.createQueryPost=async(req,res,next)=>{
    try{
        const userId=req.user.userId;
        const{
            description,
            postId,
        }=req.body;
    

        const newQueryPost=await QueryPost.create({
            description,
            postId,
            userId
        });

        res.json(newQueryPost);

    }catch(error){
        console.error('Error adding queryPost');
        res.status(500).json({error:"Error occured while adding query post"});
    }
};