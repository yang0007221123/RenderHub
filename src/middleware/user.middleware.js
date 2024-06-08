const {USERNAME_OR_PASSWORD_IS_NULL} = require("../config/errorEnum");

// 校验用户注册请求
async function validateResister(ctx, next) {
  // 1.获取请求信息
  const userInfo = ctx.request.body;
  const {username, password} = userInfo;
  
  // 2.校验用户名或者密码是否为空
  if (!username || !password) {
    // 触发app身上的error事件
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_NULL, ctx);
  }
  
  // 3.校验用户名是否已经存在
  
  
  await next(); // 后续代码是异步的
}

module.exports = {
  validateResister
}