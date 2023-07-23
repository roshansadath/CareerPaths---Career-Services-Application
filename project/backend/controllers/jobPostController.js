const JobPost= require('../model/jobPost');

module.exports.getAllJobPosts= async (req,res,next)=>{
    try{
        const jobPosts=await JobPost.findAll();
        res.json(jobPosts);
    }catch (error){
        next(error);
    }
};

module.exports.getUserJobPost=async (req,res,next)=>{
    console.log('UserJobPost>>>>>>'+req.user.userId);
    userId=req.user.userId;
    try{
        const jobPosts=await JobPost.findAll({where:{posted_by_userId:userId}});
        res.json(jobPosts);
    }catch (error){
        next(error);
    }
}

module.exports.getJobPost=async (req,res,next)=>{
    // console.log('I am here>>>>>>>>>>');
    const { id }=req.params;
    const postId=id;
    try{
        const jobPost=await JobPost.findByPk(postId);
        if (!jobPost){
            return res.status(404).json({error:'Job Post not found'});
        }
        res.json(jobPost);
    }catch(error){
        next(error);
    }
}

module.exports.createJobPost=async(req,res,next)=>{
    try{
        const { 
            job_designation,
            job_description,
            location,
            posted_date,
            name_of_the_team,
            pay_range,
             }=req.body;

        const posted_by_userId = req.user.userId;
        const status = 'Available';
        
            // Create a new jobPost
        const newJobPost = await JobPost.create({
            job_designation,
            job_description,
            location,
            posted_date,
            status,
            name_of_the_team,
            pay_range,
            posted_by_userId
        });
        res.json(newJobPost);
        
    }catch(error){
        console.error('Error adding jobPost:',error);
        res.status(500).json({error:"Error occured while adding the job post"});
    }
    
};

module.exports.updateJobPost=async(req,res,next)=>{
    try{
        const{ id }=req.params; //id from request parameters.
        const postId=id;
        console.log('Update Check>>>'+postId)
        const { 
            job_designation,
            job_description,
            location,
            posted_date,
            status,
            name_of_the_team,
            pay_range,
            posted_by_userId }=req.body;

        //Find by PK.
        const jobPost=await JobPost.findByPk(postId);

        //User not found case.
        if(!jobPost){
            return res.status(404).json({error:'Job Post not found'});
        }

        //Update user's information
            jobPost.job_designation=job_designation;
            jobPost.job_description=job_description;
            jobPost.location=location;
            jobPost.posted_date=posted_date;
            jobPost.status=status;
            jobPost.name_of_the_team=name_of_the_team;
            jobPost.pay_range=pay_range;
            jobPost.posted_by_userId=posted_by_userId;

        await jobPost.save();
        res.json(jobPost);

    }catch(error){
        console.error('Error updating a job post',error);
        res.status(500).json({error:'Error occured while updating a job post'});
    }
    
};

module.exports.deleteJobPost=async(req,res,next)=>{
    try{
        const{ id }=req.params; //id from request parameters.
        const postId=id;
        //Find by PK.
        const jobPost=await JobPost.findByPk(postId);

        //jobPost not found case.
        if(!jobPost){
            return res.status(404).json({error:'Job Post not found'});
        }

        //Delete the user from the database.
        await jobPost.destroy();

        res.json({message:'Job Post Deleted Successfully.'})

    }catch(error){
        console.error('Error Deleting a job post',error);
        res.status(500).json({error:'Error occured while deleting a job Post'})
    }
};