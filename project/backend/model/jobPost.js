const { DataTypes, NOW }=require('sequelize');
const sequelize=require('../config/database');
const User=require('./user');

const JobPost=sequelize.define('JobPost',{
        postId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        job_designation:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        job_description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        location:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        posted_date:{
            type:DataTypes.DATE,
            allowNull:true,
            defaultValue:NOW,
        },
        status:{
            type:DataTypes.STRING,
            allowNull :false,
        },
        name_of_the_team:{
            type:DataTypes.STRING,
            allowNull:true,
        },    
        pay_range:{
            type:DataTypes.STRING,
            allowNull:false,
        },
      
    },

    {
        timestamps: false, 
});
JobPost.belongsTo(User,{foreignKey:'posted_by_userId',onDelete:'CASCADE'});

module.exports=JobPost;