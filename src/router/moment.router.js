const koaRouter = require("@koa/router");
const {checkToken} = require("../middleware/login.middleware");
const {verifyCreateContent} = require("../middleware/moment.middleware");
const momentController = require("../controller/moment.controller");
const {handlePage} = require("../middleware/page.middleware");
const {verifyModify, verifyDelete} = require("../middleware/moment.middleware");

const momentRouter = new koaRouter({prefix: "/moment"});

/**
 * @description: 获取的如果是重要或保密数据的时候，中间件中也可以加上token校验
 */
momentRouter.post("/create", checkToken, verifyCreateContent, momentController.createMoment);  // 发表动态
momentRouter.post("/getList", handlePage, momentController.getList);  // 获取所有的动态列表
momentRouter.post("/getUserList", handlePage, momentController.getContentListForOneUser);  // 获取某用户的动态列表
momentRouter.post("/modify", checkToken, verifyModify, momentController.modifyOneContent);  // 修改某条动态
momentRouter.post("/delete", checkToken, verifyDelete, momentController.deleteOneContent);  // 删除某条动态
momentRouter.post("/detail", checkToken, momentController.verifyDetail);  // 查看某条动态的详情

module.exports = momentRouter;