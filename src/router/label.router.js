const {verifyLabel} = require("../middleware/label.middleware");
const labelController = require("../controller/label.controller");

const koaRouter = require("@koa/router");

const labelRouter = new koaRouter({prefix: "/label"});

labelRouter.post("/create", verifyLabel, labelController.createLabel); // 创建标签

module.exports = labelRouter;