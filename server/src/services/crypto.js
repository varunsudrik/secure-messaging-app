var CryptoJS = require("crypto-js");

const encrypt = (string, key) => {
  var ciphertext = CryptoJS.AES.encrypt(string, key).toString();
  return ciphertext;
};

const decrypt = (string, key) => {
  var bytes = CryptoJS.AES.decrypt(string, key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};

module.exports = { encrypt, decrypt };
