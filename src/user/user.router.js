const express = require('express');
const { registerUser, verifyRegisterEmail, resendOtp, userLogin } = require('./user.controller');
const route = express.Router()

route.post('/register',registerUser)
route.post('/verify-register-otp',verifyRegisterEmail)
route.post('/resend-otp',resendOtp)
route.post('/login',userLogin)

module.exports = route 