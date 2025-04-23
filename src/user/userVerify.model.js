const { DataTypes, UUIDV4 } = require('sequelize')
const sequelize = require('../../config/database')

const userVerifyModel = sequelize.define('UserVerify',{
    id : {
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
    },
    email : {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:{msg:'Enter valid email'},
            notEmpty:{msg:'Email is required for verification'}
        }
    },
     otp:{
        type:DataTypes.INTEGER,
        allowNull:false
        
     },
     expireIn : {
        type:DataTypes.DATE
     }
},{
    timestamps:true,
    tableName:'userverifys'
})

module.exports = userVerifyModel