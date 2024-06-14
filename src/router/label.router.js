const {verifyLabel, verifyDeleteLabel} = require("../middleware/label.middleware");
const labelController = require("../controller/label.controller");

const koaRouter = require("@koa/router");
const {checkToken} = require("../middleware/login.middleware");

const labelRouter = new koaRouter({prefix: "/label"});

labelRouter.post("/create", verifyLabel, labelController.createLabel); // 创建标签
labelRouter.post("/delete", checkToken, verifyDeleteLabel, labelController.deleteLabel); // 删除标签

module.exports = labelRouter;