const jwt = require("jsonwebtoken");
const jwksClient = require('jwks-rsa');

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  // Verify the token
  jwt.verify(token, getPublicKey(), (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach the decoded token to the request object for later use
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();
  });
};

const getPublicKey = () => {
  return process.env.PUBLIC_KEY;
}

module.exports = verifyToken;
