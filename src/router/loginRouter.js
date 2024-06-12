const koaRouter = require("@koa/router");
const {verifyLogin} = require("../middleware/login.middleware");
const loginController = require("../controller/login.controller");
const {checkToken} = require("../middleware/login.middleware");

const loginRouter = new koaRouter({prefix: "/login"});

loginRouter.post("/", verifyLogin, loginController.issueToken); // 用户登录

loginRouter.get("/testToken", checkToken); // 测试用户登录后的token

module.exports = loginRouter;