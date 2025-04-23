const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config/config.env' });
const {DBPASSWORD,DBUSER,DBHOST} = process.env

const sequelize = new Sequelize('vinek_bidding', DBUSER, DBPASSWORD, {
  host: DBHOST,
  dialect: 'postgres' ,
  retry: {
    max: 5 // Retry 5 times
  },
});  
module.exports = sequelize 