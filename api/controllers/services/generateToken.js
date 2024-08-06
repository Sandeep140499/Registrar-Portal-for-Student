const crypto = require("crypto");

const generatePasswordResetToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
};

// Example usage
module.exports = generatePasswordResetToken;
