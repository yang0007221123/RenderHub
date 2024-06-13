const commentService = require("../service/comment.service");

class CommentController {
  /**
   * @description: 发表评论： 1.评论的动态； 2.评论的是他人的评论
   */
  async createComment(ctx, next) {
    const {userId} = ctx.userInfo;
    let {content, momentId, commentId} = ctx.request.body;
    // 评论入库
    if (!commentId) {
      // 评论动态时没有commentId，回复他人评论时有commentId，commentId必须有赋值即使是null
      commentId = null;
    }
    const result = await commentService.saveComment(userId, content, momentId, commentId);
    if (result) {
      ctx.body = {code: 200, message: "成功"};
    }
  }
}

module.exports = new CommentController();