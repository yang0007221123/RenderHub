/**
 * @description: 用户相关
 */
const userService = require("../service/user.service")
const sendResponse = require("../utils/sendResponse");

class UserController {
  // 用户注册
  async registerUser(ctx, next) {
    const userInfo = ctx.request.body;
    const result = await userService.saveRegisterUser(userInfo); // 将用户注册信息存入数据库
    // 告知客户端用户注册结果
    sendResponse(ctx, 200, "success", "成功", result);
  }
}

module.exports = new UserController();