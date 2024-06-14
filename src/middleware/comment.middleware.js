const queryService = require("../service/queryById.service");
const sendResponse = require("../utils/sendResponse");

/**
 * @description: 校验评论内容
 */
async function verifyComment(ctx, next) {
  const {content, momentId, commentId} = ctx.request.body;
  // 1.评论内容不能为空
  if (!content) {
    return sendResponse(ctx, 400, "fail", "评论内容不能为空");
  }
  // 2.momentId不能为空
  if (!momentId) {
    return sendResponse(ctx, 400, "fail", "momentId不能为空");
  }
  // 3.momentId对应的动态是否存在
  const result = await queryService.queryById("moment", momentId);
  if (!result) {
    return sendResponse(ctx, 400, "fail", "评论的动态不存在");
  }
  // 4.commentId不能为空
  if (ctx.request.url === "/comment/reply" && !commentId) {
    return sendResponse(ctx, 400, "fail", "commentId不能为空");
    
  }
  // 5.commentId对应的评论是否存在
  if (!!commentId) {
    const result = await queryService.queryById("comment", commentId);
    if (!result) {
      return sendResponse(ctx, 400, "fail", "回复的评论不存在");
    }
  }
  // 6.评论入库
  await next();
}

module.exports = {
  verifyComment
}