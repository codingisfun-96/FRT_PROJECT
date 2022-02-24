require("pidcrypt/seedrandom")
const pidCrypt = require("pidcrypt")
require("pidcrypt/aes_cbc")
const aes = new pidCrypt.AES.CBC()

let encrypt = function encrypt(data,key){
    var encrypted = aes.encryptText(data, key);
    return(encrypted);
}
let decrypt = function decrypt(cypher,key){
    var decrypted = aes.decryptText(cypher, key);
    return(decrypted);
}

// console.log(encrypt("Hello",1234));

exports.encrypt = encrypt;
exports.decrypt = decrypt;