// auth.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return token;
};

module.exports = generateAuthToken;
