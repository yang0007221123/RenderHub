const {CONTENT_IS_EMPTY} = require("../config/errorEnum");

/**
 * @description: 校验发表动态的内容
 */
async function verifyContent(ctx, next) {
  const content = ctx.request.body.content;
  // 1.校验动态动态是否为空
  if (!content) {
    return ctx.app.emit("error", CONTENT_IS_EMPTY, ctx);
  }
  // todo 2.校验文本内容是否合法
  await next();
  
}

module.exports = {
  verifyContent
}