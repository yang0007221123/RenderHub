const labelService = require("../service/label.service");
const sendResponse = require("../utils/sendResponse");

class LabelController {
  /**
   * @description: 创建标签
   */
  async createLabel(ctx, next) {
    const {labelList} = ctx.request.body;
    const result = await labelService.createLabel(labelList);
    if (result) {
      sendResponse(ctx, 200, "success", "成功");
    }
  }
  
  /**
   * @description: 删除标签
   */
  async deleteLabel(ctx, next) {
    const {idList} = ctx.request.body;
    const result = await labelService.deleteLabelByIds(idList);
    if (result) {
      sendResponse(ctx, 200, "success", "成功");
    }
  }
}

module.exports = new LabelController();