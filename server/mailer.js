const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    // type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    // clientId: process.env.OAUTH_CLIENT_ID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
  debug: true,
  logger: true,
});

module.exports = { transporter };
