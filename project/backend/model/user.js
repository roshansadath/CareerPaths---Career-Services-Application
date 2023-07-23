const { DataTypes }=require('sequelize');
const sequelize=require('../config/database');
const bcrypt=require('bcrypt');

const User=sequelize.define('User',{
        userId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            set(value){
                if(!value){
                    throw new Error('Password value is required');
                }
                const hashedPassword=bcrypt.hashSync(value,10);
                this.setDataValue('password',hashedPassword);
            },
        },
        userType:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        cvUrl:{
            type:DataTypes.STRING,
            allowNull:true,
        },
      
    },
    {
        timestamps: false, 
});

module.exports=User;