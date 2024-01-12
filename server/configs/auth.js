// auth.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const generateAuthToken = (user) => {
  // Create a payload object without lrn property
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
  };

  // Add lrn property to payload only if the user's role is "student"
  if (user.role === "student") {
    payload.lrn = user.lrn;
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  // comment out muna habang wala pa frontend

  // res.cookie("authToken", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  // });

  return token;
};

module.exports = generateAuthToken;
