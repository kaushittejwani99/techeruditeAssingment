const nodemailer = require('nodemailer');

// Configure Nodemailer transport (use your email provider's details)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service here (e.g., 'gmail', 'smtp.mailtrap.io')
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Function to send verification email
const sendVerificationEmail = (email, token) => {
  const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

  const mailOptions = {
    from: 'xyz@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
