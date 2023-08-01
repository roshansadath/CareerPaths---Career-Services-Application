const express = require('express');
const app = express();
const sequelize=require('./config/database');
const userRoutes=require('./routes/userRoutes');
const loginRoutes=require('./routes/loginRoute');
const jobPostRoutes=require('./routes/jobPostRoutes');
const uploadRoute=require('./routes/uploadRoute');
const queryPostRoute=require('./routes/queryPostRoutes');
const jobApplicationRoutes=require('./routes/jobApplicationRoutes');
const cors=require('cors');
const User=require('./model/user');
const JobPost=require('./model/jobPost');
const JobApplication=require('./model/jobApplications');


sequelize.sync({alter:true})
   .then(()=>{
      console.log('Database synchronized successfully.');
   })
   .catch((error)=>{
      console.error('Unable to synchronized the database.',error);
   });

//Middleware
app.use(express.json());

app.use(cors());

//Routes
app.use('/user',userRoutes);
app.use('/login',loginRoutes);
app.use('/job_post',jobPostRoutes);
app.use('/job_application',jobApplicationRoutes);
app.use('/upload',uploadRoute);
app.use('/querypost',queryPostRoute);

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({error:'Internal server error'});
});

//Start the server
const port=7080;
app.listen(port, () => {
   console.log(`Server Running on port ${port}`);
});