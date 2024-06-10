const koaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const {validateResister} = require("../middleware/user.middleware");

const userRouter = new koaRouter({prefix: "/user"});  // 创建路由

// validateResister中间件用于校验账号、密码等信息
userRouter.post("/register", validateResister, userController.registerUser); // 用户注册

module.exports = userRouter;