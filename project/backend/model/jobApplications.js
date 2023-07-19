const { DataTypes,NOW }=require('sequelize');
const sequelize=require('../config/database');
const bcrypt=require('bcrypt');
const User=require('./user');
const JobPost=require('./jobPost');
const JobApplication=sequelize.define('JobApplication',{
    applicationId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    applied_date:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue:NOW,
    },
    status:{
        type:DataTypes.STRING,
        allowNull :false,
    },
       
   
    },
    {
        timestamps: false, 
});
JobApplication.belongsTo(JobPost,{foreignKey:'postId'});
JobApplication.belongsTo(User,{foreignKey:'userId'});

module.exports=JobApplication;