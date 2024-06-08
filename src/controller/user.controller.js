/**
 * @description: UserController---处理路由中间件的操作
 */
const userService = require("../service/user.service")

class UserController {
  // 用户注册
  async registerUser(ctx, next) {
    const userInfo = ctx.body;
    
    // 将用户注册信息存入数据库
    const result = await userService.saveRegisterUser(userInfo);
    console.log("registerUser", result);
    
    // 告知客户端用户注册结果
    ctx.body = {
      code: 200,
      message: "成功",
      data: result
    }
  }
}

module.exports = new UserController();