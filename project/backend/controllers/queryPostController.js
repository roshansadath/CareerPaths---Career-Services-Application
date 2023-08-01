const QueryPost=require('../model/queryPost');
const User=require('../model/user');
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

module.exports.getQueryPost=async(req,res,next)=>{
    const{ id }=req.params;
    try{
        const queryPost=await QueryPost.findByPk(id);
        if(!queryPost){
            return res.status(404).json({error:'Query Post not found.'});
        }
        res.json(queryPost);
    }catch(error){
        next(error);
    }
}

module.exports.getJobPostQueryPost=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const queryPosts= await QueryPost.findAll({where:{postId:id},
            include:[User],
        });
        res.json(queryPosts);
    }catch(error){
        next(error);
    }
}