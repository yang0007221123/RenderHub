/**
 * @description: 用户相关
 */
const userService = require("../service/user.service")

class UserController {
  // 用户注册
  async registerUser(ctx, next) {
    const userInfo = ctx.request.body;
    const result = await userService.saveRegisterUser(userInfo); // 将用户注册信息存入数据库
    // 告知客户端用户注册结果
    ctx.body = {code: 200, message: "成功", data: result}
  }
}

module.exports = new UserController();