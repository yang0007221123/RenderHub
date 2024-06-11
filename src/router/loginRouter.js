const koaRouter = require("@koa/router");
const {verifyLogin} = require("../middleware/login.middleware");
const loginController = require("../controller/login.controller");

const loginRouter = new koaRouter({prefix: "/login"});

loginRouter.post("/", verifyLogin, loginController.issueToken); // 用户登录

module.exports = loginRouter;