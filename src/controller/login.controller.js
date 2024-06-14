/**
 * @description: 登录相关
 */
const {sign} = require("jsonwebtoken");
const {PRIVATE_KEY} = require("../config/secretKey");
const sendResponse = require("../utils/sendResponse");

class LoginController {
  // 签发token
  async issueToken(ctx, next) {
    const {id, username} = ctx.userInfo;
    try {
      // 1. 使用sign方法生成token
      const token = sign({id, username}, PRIVATE_KEY, {
        expiresIn: 12 * 60 * 60,  // 12hours过期
        // expiresIn: 30,  // 30s过期
        algorithm: "RS256" // 加密方式
      })
      sendResponse(ctx, 200, "success", "成功", {token});
    } catch (e) {
      console.log("err-issueToken", e);
    }
  }
}

module.exports = new LoginController();