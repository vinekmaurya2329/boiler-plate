const { StatusCodes } = require("http-status-codes");
const catchAsyncError = require("../../utils/catchAsyncError");
const ErrorHandler = require("../../utils/errorHandler");
const userModel = require("./user.model");
const userVerifyModel = require("./userVerify.model");
const verifyEmail = require("../templete/verifyEmail");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, address } = req.body;

  const checkUser = await userVerifyModel.findOne({ where: { email } });
  if (checkUser) {
    const user = await userModel.findOne({ where: { email } });
    if (!user.isVerified) {
      return next(
        new ErrorHandler(
          "User is already registered but not verified !",
          StatusCodes.NOT_ACCEPTABLE
        )
      );
    } else {
      return next(
        new ErrorHandler(
          "User is already registered, please login !",
          StatusCodes.NOT_ACCEPTABLE
        )
      );
    }
  }
  const hashedPasword = password;
  const user = await userModel.create({
    name,
    email,
    phone,
    address,
    password: hashedPasword,
  });
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expireIn = Date.now() + 3 * 60 * 1000; // 3 mins in milliseconds
  const userVerify = await userVerifyModel.create({ email, otp, expireIn });
  //  send otp on email
  await verifyEmail(name, email, otp);

  res.status(StatusCodes.OK).json({
    message: `Otp send successfully on ${email}`,
    success: true,
  });
});

exports.verifyRegisterEmail = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;
  const checkUser = await userVerifyModel.findOne({ where: { email } });
  if (!checkUser) {
    return next(
      new ErrorHandler(`Otp not found for this email: ${email}`, StatusCodes)
    );
  }
  if (checkUser.otp !== otp) {
    return next(new ErrorHandler("Invalid Otp", StatusCodes.BAD_REQUEST));
  }
  if (Date.now() - checkUser.expireIn >= 3) {
    return next(new ErrorHandler("Otp expired", StatusCodes.BAD_REQUEST));
  }
  await checkUser.update({ otp: null });
  const verifyed = await userModel.findOne({ where: { email } });
  await verifyed.update({ isVerified: true });

  res.status(StatusCodes.OK).json({
    message: "Otp verified successfully",
    success: true,
  });
});

exports.resendOtp = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required"), StatusCodes.BAD_REQUEST);
  }

  const otp = Math.floor(1000 + Math.random() * 9000); // ensures a 4-digit OTP
  const expireIn = Date.now() + 3 * 60 * 1000; // 3 minutes in ms

  const checkUser = await userVerifyModel.findOne({ where: { email } });
  if (checkUser) {
    checkUser.update({ otp, expireIn });
  } else {
    await userVerifyModel.create({ email, otp, expireIn });
  }
  await verifyEmail("user",email,otp);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "OTP sent successfully"
    
  });

});

exports.userLogin = catchAsyncError(async (req,res,next)=>{
    const {email,password}  = req.body;

    if (!email || !password){
        return  next(new ErrorHandler('Email and Password is required',StatusCodes.BAD_REQUEST))
    }
     const checkUser = await userModel.findOne({where:{email}})
     if(!checkUser){
        return next(new ErrorHandler('User is not registered',StatusCodes.NOT_ACCEPTABLE))
     }
      if(!checkUser.isVerified){
        return next(new ErrorHandler('User registered but not verified',StatusCodes.NOT_ACCEPTABLE)
        )
      }
    //   check password 

    
})
