const {USERNAME_OR_PASSWORD_IS_NULL, USERNAME_IS_NOT_EXISTS} = require("../config/errorEnum");
const {findUserName} = require("../service/user.service");
const {encryptPassword} = require("../utils/handleEncrypt");

async function verifyLogin(ctx, next) {
  const {username, password} = ctx.request.body;
  
  // 1.用户名或者密码是否为空
  if (!username || !password) {
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_NULL, ctx);
  }
  
  // 2.用户名是否存在
  const userInfo = await findUserName(username);
  if (!userInfo.length) {
    return ctx.app.emit("error", USERNAME_IS_NOT_EXISTS, ctx);
  }
  
  // 3.密码是否正确
  if (encryptPassword(password) !== userInfo[0].password) {
    return ctx.app.emit("error", USERNAME_IS_NOT_EXISTS, ctx);
  }
  
  // 4.签发token
  ctx.userInfo = userInfo; // 提供给下一个中间件使用
  await next();
}

module.exports = {
  verifyLogin
}