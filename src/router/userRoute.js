const koaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const {validateResister} = require("../middleware/user.middleware");

const userRouter = new koaRouter({prefix: "/user"});  // 创建路由

userRouter.post("/register", validateResister, userController.registerUser); // 用户注册

module.exports = userRouter;