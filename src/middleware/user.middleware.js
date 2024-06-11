const {USERNAME_OR_PASSWORD_IS_NULL, USERNAME_IS_ALREADY_EXISTS} = require("../config/errorEnum");
const {findUserName} = require("../service/user.service");
const {encryptPassword} = require("../utils/handleEncrypt");

// 校验用户注册请求
async function verifyResister(ctx, next) {
  // 1.获取请求信息
  const userInfo = ctx.request.body;
  const {username, password} = userInfo;
  
  // 2.校验用户名或者密码是否为空
  if (!username || !password) {
    // 触发app身上的error事件
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_NULL, ctx);
  }
  
  // 3.校验用户名是否已经存在
  const result = await findUserName(username);
  if (!!result.length) {
    return ctx.app.emit("error", USERNAME_IS_ALREADY_EXISTS, ctx);
  }
  
  await next(); // 执行后续代码
}

// 加密用户密码
async function handleEncrypt(ctx, next) {
  const {password} = ctx.request.body;
  ctx.request.body.password = encryptPassword(password);
  await next();
}

module.exports = {
  verifyResister,
  handleEncrypt
}