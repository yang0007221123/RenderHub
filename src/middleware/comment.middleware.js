const queryService = require("../service/queryById.service");

/**
 * @description: 校验评论内容
 */
async function verifyComment(ctx, next) {
  const {content, momentId, commentId} = ctx.request.body;
  // 1.评论内容不能为空
  if (!content) {
    return ctx.body = {code: 0, message: "评论内容不能为空"};
  }
  // 2.momentId不能为空
  if (!momentId) {
    return ctx.body = {code: 0, message: "momentId不能为空"};
  }
  // 3.momentId对应的动态是否存在
  const result = await queryService.queryById("moment", momentId);
  if (!result) {
    return ctx.body = {code: 0, message: "评论的动态不存在"};
  }
  // 4.commentId不能为空
  if (ctx.request.url === "/comment/reply" && !commentId) {
    return ctx.body = {code: 0, message: "commentId不能为空"};
  }
  // 5.commentId对应的评论是否存在
  if (!!commentId) {
    const result = await queryService.queryById("comment", commentId);
    if (!result) {
      return ctx.body = {code: 0, message: "回复的评论不存在"};
    }
  }
  // 5.评论入库
  await next();
}

module.exports = {
  verifyComment
}