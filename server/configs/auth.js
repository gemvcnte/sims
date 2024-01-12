// auth.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwksClient = require('jwks-rsa');

// Load environment variables from .env file
dotenv.config();

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, username: user.username, role: user.role, lrn: user.lrn },
    getPrivateKey(),
    {algorithm: 'RS256', expiresIn: '1h'}
  );

  // comment out muna habang wala pa frontend

  // res.cookie("authToken", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  // });

  return token;
};


const getPrivateKey = () => {
  return process.env.PRIVATE_KEY;
}

module.exports = generateAuthToken;
