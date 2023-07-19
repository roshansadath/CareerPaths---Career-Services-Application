const express = require('express');
const app = express();
const sequelize=require('./config/database');
const cors=require('cors');



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

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({error:'Internal server error'});
});

//Start the server
const port=7080;
app.listen(port, () => {
   console.log(`Server Running on port ${port}`);
});

