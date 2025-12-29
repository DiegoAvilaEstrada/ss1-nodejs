const nodemailer = require('nodemailer');
const authUtils = require('../utils/authUtils');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'deepgptsolutions@gmail.com',
    pass: 'bypr fpxa vzpm ywpr'
  }
});

class EmailService {
  async sendVerificationCode(email) {
    const verificationCode = authUtils.generateVerificationCode();
    
    const mailOptions = {
      from: 'deepgptsolutions@gmail.com',
      to: email,
      subject: 'Codigo de verificacion',
      text: `El código para iniciar sesión es: ${verificationCode}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Código de verificación enviado a: ${email}`);
      return verificationCode;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();

