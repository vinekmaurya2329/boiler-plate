const { DataTypes } = require('sequelize')
const sequelize = require('./../../config/database')

const userModel = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
       defaultValue:DataTypes.UUIDV4
    },
    name : {
        type:DataTypes.STRING,
        allowNull:false,
         validate:{
            notEmpty:{msg:'Name is required'},
            len:{
                args:[3,100],
                msg:'Name must me at least 3 characters long'
            }
         }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:{msg:'Please enter valid email'},
            notEmpty:{msg:'Email is required'}
        }
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
        
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:'Password is required'},
            len:{
                args:[8,255],
                msg:'Password must be at least 8 characters long'
            }
        },
        

    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:'Address is required'}
        }
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'User'
    },
    isVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    blocked :{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps:true,
    tableName:'users',
    paranoid: true, //  Enables soft delete
})

module.exports = userModel