const nodemailer = require("nodemailer");
const express = require("express");
const mailRouter = express.Router();

const { google } = require("googleapis");

const CLIENT_ID =
  "1022486305917-cs04dme4apn86e8mhpq15eelr1qk1pr7.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
  "1//04Xz53S7mYYxfCgYIARAAGAQSNwF-L9IraTVUvwr8rVoET9yc4NIAq5L7rTslH9OKayQHoxLw8Cxki6JIDPeB4BBJ_alJtV1UuY8";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

// Create an OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

// Set the refresh token
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

mailRouter.post("/send-email", async (req, res) => {
  const formData = req.body;

  const ACCESS_TOKEN = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "harshagihan50@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
  });

  const mailOptions = {
    from: formData.email, // Set the sender's email
    to: "harshagihan50@gmail.com",
    subject: "New Account Request",
    html: `
        <p>You have a new account request from new customer.</p>
        <p>First Name: ${formData.firstName}</p>
        <p>Last Name: ${formData.lastName}</p>
        <p>Email: ${formData.email}</p>
        <p>Username: ${formData.userName}</p>
        <p>Country: ${formData.country}</p>
        <p>Mobile Number: ${formData.mobileNo}</p>
        <p>Request submitted on: ${new Date().toLocaleString()}</p>
      `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
    res.status(200).send("Email sent to admin");
  } catch (error) {
    console.error("Error sending email to admin:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = mailRouter;
