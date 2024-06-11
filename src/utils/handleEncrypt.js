/**
 * @description: 该文件用于各种加密
 */
const crypto = require("crypto");

// MD%加密方式：加密用户密码
function encryptPassword(password) {
  const md5Hash = crypto.createHash("md5");
  // "hex"表示返回的是十六进制的加密结果
  return md5Hash.update(password).digest("hex");
}

module.exports = {
  encryptPassword
}