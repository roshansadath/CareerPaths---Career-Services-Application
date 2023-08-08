const {DataTypes}=require('sequelize');
const sequelize=require('../config/database');
const JobPost=require('./jobPost');
const User=require('./user');

const QueryPost=sequelize.define('QueryPost',{
    queryPostId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
});
QueryPost.belongsTo(JobPost,{foreignKey:'postId',onDelete:'CASCADE'});
QueryPost.belongsTo(User,{foreignKey:'userId',onDelete:'CASCADE'});

module.exports=QueryPost;
