const koaRouter = require("@koa/router");
const {checkToken} = require("../middleware/login.middleware");
const {verifyContent} = require("../middleware/moment.middleware");
const momentController = require("../controller/moment.controller");
const {handlePage} = require("../middleware/page.middleware")

const momentRouter = new koaRouter({prefix: "/moment"});

momentRouter.post("/create", checkToken, verifyContent, momentController.createMoment);  // 发表动态
momentRouter.post("/getList", checkToken, handlePage, momentController.getList);  // 获取所有的动态列表
momentRouter.post("/getUserList", checkToken, handlePage, momentController.getContentListForOneUser);  // 获取某用户的动态列表


module.exports = momentRouter;