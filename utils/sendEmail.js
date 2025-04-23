const nodemailer = require('nodemailer');

const sendEmail = async(name,email,template)=>{
    
   
    
    let transporter = nodemailer.createTransport({
      // host: 'gmail',
      // port: 587,
      // secure: false,
      service: 'gmail',
      auth: {
        user: 'vinek.quantumitinnovation@gmail.com',
        pass: process.env.NODE_MAILER_PASS
      },
    });
    
    let mailOptions = {
      from: `Bidding App`,
      to: `${email}`,
      subject: `hello ${name || 'user'} `,
      text: 'Hello world?',
      html: template,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      // console.log('Message sent: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    
    
    
   
}
 module.exports = sendEmail 