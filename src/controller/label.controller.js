const labelService = require("../service/label.service");

class LabelController {
  /**
   * @description: 创建标签
   */
  async createLabel(ctx, next) {
    const {label} = ctx.request.body;
    const result = await labelService.createLabel(label);
    if (result) {
      ctx.body = {code: 200, message: "成功"};
    }
  }
}

module.exports = new LabelController();