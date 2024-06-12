const koaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const {verifyResister} = require("../middleware/user.middleware");
const {handleEncrypt} = require("../middleware/user.middleware");

const userRouter = new koaRouter({prefix: "/user"});  // 创建路由

// validateResister中间件-校验注册参数
// handleEncrypt中间件-加密用户密码
// userController.registerUser中间件-用户信息入库
userRouter.post("/register", verifyResister, handleEncrypt, userController.registerUser); // 用户注册

module.exports = userRouter;