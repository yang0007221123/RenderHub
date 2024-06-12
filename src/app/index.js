/**
 * @description: 项目App
 */
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router/index");

const app = new koa(); // 创建服务

// 注册中间件
app.use(bodyParser());

// 注册所有路由
registerRouters(app);

// 导出app
module.exports = app;