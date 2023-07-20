const JobApplication= require('../model/jobApplications');
const User= require('../model/user');


module.exports.getUserJobApplications=async (req,res,next)=>{
    console.log('UserJobPost>>>>>>'+req.user.userId);
    userId=req.user.userId;
    try{
        const jobApplications=await JobApplication.findAll({where:{userId:userId}});
        res.json(jobApplications);
    }catch (error){
        next(error);
    }
}

module.exports.getJobPostJobApplications= async (req,res,next)=>{
    const { id }=req.params;
    try{
        const jobApplications=await JobApplication.findAll({where:{postId:id},
        include: [User],
        });
        res.json(jobApplications);
    }catch (error){
        next(error);
    }
};
module.exports.getAllJobApplications= async (req,res,next)=>{
    try{
        const jobApplications=await JobApplication.findAll();
        res.json(jobApplications);
    }catch (error){
        next(error);
    }
};

module.exports.getJobApplication=async (req,res,next)=>{
    console.log('I am here>>>>>>>>>>');
    const { id }=req.params;
    const applicationId=id;
    try{
        const jobApplication=await JobApplication.findByPk(applicationId);
        if (!jobApplication){
            return res.status(404).json({error:'Job Application not found'});
        }
        res.json(jobApplication);
    }catch(error){
        next(error);
    }
}

module.exports.createJobApplication=async(req,res,next)=>{
    try{
        const { 
            applied_date,
            status,
            postId,
            userId }=req.body;
        
            // Create a new jobPost
        const newJobApplication = await JobApplication.create({
            applied_date,
            status,
            postId,
            userId
        });
        res.json(newJobApplication);
        
    }catch(error){
        console.error('Error adding job application:',error);
        res.status(500).json({error:"Error occured while adding the job application"});
    }
    
};

module.exports.updateJobApplication=async(req,res,next)=>{
    try{
        const{ id }=req.params; //id from request parameters.
        const appliationId=id;
        
        const { 
            applied_date,
            status,
            postId,
            userId }=req.body;

        //Find by PK.
        const jobApplication=await JobApplication.findByPk(appliationId);

        //User not found case.
        if(!jobApplication){
            return res.status(404).json({error:'Job Application not found'});
        }

        //Update job  application information
        jobApplication.applied_date=applied_date;
        jobApplication.status=status;
        jobApplication.postId=postId;
        jobApplication.userId=userId;
            
        await jobApplication.save();
        res.json(jobApplication);

    }catch(error){
        console.error('Error updating a job application',error);
        res.status(500).json({error:'Error occured while updating a job application'});
    }
    
};

module.exports.deleteJobApplication=async(req,res,next)=>{
    try{
        const{ id }=req.params; //id from request parameters.
        const appliationId=id;
        //Find by PK.
        const jobApplication=await JobApplication.findByPk(appliationId);

        //jobPost not found case.
        if(!jobApplication){
            return res.status(404).json({error:'Job Application not found'});
        }

        //Delete the user from the database.
        await jobApplication.destroy();

        res.json({message:'Job Application Deleted Successfully.'})

    }catch(error){
        console.error('Error Deleting a job application',error);
        res.status(500).json({error:'Error occured while deleting a job application'})
    }

};
