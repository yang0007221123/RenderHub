/**
 * @description: 统一处理接口请求的错误信息返回
 */

const app = require("../app/index");
const {USERNAME_OR_PASSWORD_IS_NULL, USERNAME_IS_ALREADY_EXISTS} = require("../config/errorEnum");

// 监听项目的错误事件
app.on("error", (err, ctx) => {
  let code = 0; // 错误码
  let message = ""; // 错误信息
  
  switch (err) {
    case USERNAME_OR_PASSWORD_IS_NULL:
      code = -1001;
      message = "用户名或者密码不能为空"
      break;
    case USERNAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经存在";
      break;
    default:
      break;
  }
  
  ctx.body = {code, message};  // 告知客户端错误信息
})