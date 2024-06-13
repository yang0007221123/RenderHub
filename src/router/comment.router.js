const koaRouter = require("@koa/router");
const {checkToken} = require("../middleware/login.middleware");
const {verifyComment} = require("../middleware/comment.middleware");
const commentController = require("../controller/comment.controller");


const commentRouter = new koaRouter({prefix: "/comment"});

commentRouter.post("/create", checkToken, verifyComment, commentController.createComment);  // 对动态发表评论
commentRouter.post("/reply", checkToken, verifyComment, commentController.createComment);  // 评论其他评论

module.exports = commentRouter;