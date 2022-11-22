const nodemailer = require("nodemailer");
const constants = require("./constant");

const emailSender = async ({ email, subject, body }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    accessToken:process.env.ACCESS_TOKEN,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
  });

  const mailData = {
    from: constants.auth.EMAIL,
    to: email,
    subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = emailSender;
