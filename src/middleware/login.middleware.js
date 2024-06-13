const {USERNAME_OR_PASSWORD_IS_NULL, USERNAME_IS_NOT_EXISTS, TOKEN_IS_INVALID} = require("../config/errorEnum");
const userService = require("../service/user.service");
const {encryptPassword} = require("../utils/handleEncrypt");
const {verify, decode} = require("jsonwebtoken");
const {PUBLIC_KEY} = require("../config/secretKey");

/**
 * @description: 校验登录请求
 */
async function verifyLogin(ctx, next) {
  const {username, password} = ctx.request.body;
  
  // 1.用户名或者密码是否为空
  if (!username || !password) {
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_NULL, ctx);
  }
  
  // 2.用户名是否存在
  const userInfo = await userService.findUserName(username);
  if (!userInfo.length) {
    return ctx.app.emit("error", USERNAME_IS_NOT_EXISTS, ctx);
  }
  
  // 3.密码是否正确
  if (encryptPassword(password) !== userInfo[0].password) {
    return ctx.app.emit("error", USERNAME_IS_NOT_EXISTS, ctx);
  }
  
  // 4.签发token
  ctx.userInfo = userInfo[0]; // 提供给下一个中间件使用
  await next();
}

/**
 * @description: 校验token
 */
async function checkToken(ctx, next) {
  const token = ctx.headers.token;  // token放在headers中
  if (!token) {
    return ctx.app.emit("error", TOKEN_IS_INVALID, ctx);
  }
  try {
    // 只要token校验失败或者无效，都会抛出异常
    const result = verify(token, PUBLIC_KEY, {algorithm: ["RS256"], complete: true});
    const {payload} = result;
    ctx.userInfo = {userId: payload.id, userName: payload.username};  /* userId、userName直接放在ctx身上，以供后续中间件使用 */
    ctx.body = {code: 200, message: "成功"};
  } catch (e) {
    console.log("err-checkToken", e);
    return ctx.app.emit("error", TOKEN_IS_INVALID, ctx);
  }
  await next();
}


module.exports = {
  verifyLogin,
  checkToken
}