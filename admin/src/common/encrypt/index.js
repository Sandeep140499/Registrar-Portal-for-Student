import CryptoJS from "crypto-js";

export const encryptData = (data, key) => {
  // Encrypt data using AES encryption
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key
  ).toString();
  return encryptedData;
};

// // Example usage:
// const dataToEncrypt = { /* Your data */ };
// const encryptionKey = 'your-secret-key';
// const encryptedData = encryptData(dataToEncrypt, encryptionKey);
