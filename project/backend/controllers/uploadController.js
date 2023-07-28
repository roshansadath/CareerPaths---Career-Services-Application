const formidable = require('formidable');
const fs=require('fs');
const path=require('path');
const { v4:uuidv4 }=require('uuid');
const User=require('../model/user');

function generateUniqueFileName(filename){
    const uniqueId=uuidv4();
    const timestamp=Date.now();
    const fileExtension=path.extname(filename);
    const uniqueFileName=`${timestamp}-${uniqueId}${fileExtension}`;
    return uniqueFileName;
}

module.exports.updateCv=async(req,res,next)=>{
    console.log('Update CV called');
    const form = new formidable.IncomingForm();
    console.log(form);

    form.parse(req,async(err,fields,files)=>{
        if(err){
            res.status(400).send('Error parsing data from the form.');
            return;
        }

        let cvUrl=null;

        const cvFile=files.cvFile;
        console.log(cvFile);
        if(cvFile){
            const cvFileName=generateUniqueFileName(cvFile[0].originalFilename);
            console.log(">>>>>>>"+cvFileName);
            const cvTemporaryPath=cvFile[0].filepath;
            console.log(cvTemporaryPath);
            const parentDirectory=path.join(__dirname,'..');
            console.log('parent::::::::::::'+parentDirectory);
            const destinationPath=parentDirectory+ '/uploads/'+cvFileName;
            try {
                // Custom promise for fs.rename()
                await new Promise((resolve, reject) => {
                  fs.rename(cvTemporaryPath, destinationPath, (err) => {
                    if (err) {
                      console.error('Error storing a cv.', err);
                      reject(err); // Reject the promise if an error occurs
                    } else {
                      cvUrl = cvFileName; // Update cvUrl after successful file move
                      resolve(); // Resolve the promise when the file move is successful
                    }
                  });
                });
              } catch (error) {
                res.status(500).send('Error storing a cv.');
                return;
              }   
        }
        
        const user=await User.findByPk(req.user.userId);

        //User not found case.
        if(!user){
            return res.status(404).json({error:'User not found'});
        }

        //Update cv information
        user.cvUrl=cvUrl;
        await user.save();
        res.json({message:'CV updated successfully.'});

    });  
}    

module.exports.displayCv=async(req,res)=>{
  const cvFileName=req.params.cvFileName;
  const parentDirectory=path.join(__dirname,'..'); 
  const uploadDirectory=parentDirectory+ '/uploads/';
  const filePath=path.join(uploadDirectory,cvFileName);

  if(fs.existsSync(filePath)){
    // console.log('cv found');
    res.setHeader('Content-Type','application/pdf');
    const fileStream=fs.createReadStream(filePath);
    fileStream.pipe(res);
  }else{
    // console.log('cv not found');
    res.status(404).json({error:'File not found.'});
  }
}