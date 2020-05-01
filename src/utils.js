const aesjs = require("aes-js");

const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

const encrypt = (text) => {
// Convert text to bytes
    const textBytes = aesjs.utils.utf8.toBytes(text);

// The counter is optional, and if omitted will begin at 1
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    return encryptedHex;
}
const decrypt = (decryptText) => {
    var encryptedBytes = aesjs.utils.hex.toBytes(decryptText);

// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

// Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    return decryptedText;
}

module.exports = {
    encrypt,
    decrypt
}
