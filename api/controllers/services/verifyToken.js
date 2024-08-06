const jwt = require("jsonwebtoken");
const config = require("../../config");

function verifyToken(req, res, next) {
  const token = req?.headers?.authorization?.split(" ")[1];
  // console.log(req?.headers?.authorization.substring(7), "token ddd");
  if (!token) {
    return res.status(403).json({ message: "Invalid Token" });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
