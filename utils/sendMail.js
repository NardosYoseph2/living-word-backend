// utils/sendMail.js
const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, html }) => {
  // Create a nodemailer transporter
  let transporter = nodemailer.createTransport({
    // Configure your email service provider here
    service: 'gmail',
    auth: {
      user: 'nardosyosef123@gmail.com',
      pass: 'nardi123nardi123',
    },
  });

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'Living Word Church',
      to,
      subject,
      html,
    });

    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error; // Propagate the error to the caller
  }
};

module.exports = sendMail;
