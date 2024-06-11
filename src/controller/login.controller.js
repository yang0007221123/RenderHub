/**
 * @description: 登录模块
 */
const {sign} = require("jsonwebtoken");
const {PRIVATE_KEY} = require("../config/secretKey");

class LoginController {
  // 签发token
  async issueToken(ctx, next) {
    const {id, username} = ctx.userInfo;
    try {
      // 1. 使用sign方法生成token
      const token = sign({id, username}, PRIVATE_KEY, {
          expiresIn: 2 * 60 * 60,  // 过期时间
          algorithm: "RS256" // 加密方式
        }
      )
      ctx.body = {code: 200, token}
    } catch (e) {
      console.log("err-issueToken", e);
    }
  }
}

module.exports = new LoginController();