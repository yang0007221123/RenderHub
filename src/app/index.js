/**
 * @description: 项目App
 */
const koa = require("koa");
const userRouter = require("../router/userRoute");
const bodyParser = require("koa-bodyparser")

const app = new koa(); // 创建服务

// 注册中间件
app.use(bodyParser());

// 注册路由
app.use(userRouter.routes());  // user路由
app.use(userRouter.allowedMethods());

// 导出app
module.exports = app;