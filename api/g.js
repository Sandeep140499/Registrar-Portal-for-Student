const crypto = require('crypto');

// Generate a secure random string with a specified length
const generateSecretCode = (length) => {
  const randomBytes = crypto.randomBytes(length);
  return randomBytes.toString('hex');
};

// Generate a secret code of length 16
const secretCode = generateSecretCode(16);

console.log('Generated Secret Code:', secretCode);
