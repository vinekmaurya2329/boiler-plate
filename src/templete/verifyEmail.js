const sendEmail = require("../../utils/sendEmail");

let verifyDetails = {
    name:'User',
    email:'',
    otp:''
}
function generateOtpTemplate(details) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                background-color: #1A5E9B;
                color: #ffffff;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #1A5E9B;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777777;
            }
            .footer a {
                color: #1A5E9B;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Email Verification</h1>
            </div>
            <div class="content">
                <p>Dear ${details.name},</p>
                <p>Thank you for registering with us. Please use the following One-Time Password (OTP) to verify your email address:</p>
                <div class="otp">${details.otp}</div>
                <p>This OTP is valid for 3 minutes. If you did not request this verification, please ignore this email.</p>
                <p>Thank you,<br>The Bidding App Team</p>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

  async function verifyEmail(name,email,otp){
   
    verifyDetails.name = name,
    verifyDetails.email = email,
    verifyDetails.otp = otp
    
    const otpTemplate = generateOtpTemplate(verifyDetails)

      await sendEmail(name,email,otpTemplate)
  }

 
 
    module.exports =  verifyEmail