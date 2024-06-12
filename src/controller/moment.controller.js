const momentService = require("../service/moment.service");
const {USER_IS_NOT_EXISTS} = require("../config/errorEnum");

/**
 * @description: 动态相关
 */
class MomentController {
  /**
   * @description:  发表动态
   */
  async createMoment(ctx, next) {
    const {id} = ctx.userInfo;
    // 1.userId是否存在
    const res = await momentService.checkUserId(id); // 校验userId是否存在
    if (!res?.length) {
      return ctx.app.emit("error", USER_IS_NOT_EXISTS, ctx);
    }
    // 2.内容入库
    const result = await momentService.createMoment(id, ctx.request.body.content); // 动态内容入库
    if (result) {
      ctx.body = {code: 200, message: "成功", data: result};
      return;
    }
    ctx.body = {code: 0, message: "动态发布失败", data: result};
  }
  
  /**
   * @description: 获取动态列表
   */
  async getList(ctx, next) {
    const {limit, offset} = ctx;
    const result = await momentService.getContentList(limit, offset);
    ctx.body = {code: 200, message: "成功", contentList: result};
  }
  
  /**
   * @description: 获取某用户的动态列表
   */
  async getContentListForOneUser(ctx, next) {
    const {userId} = ctx.request.body;
    // 1. userId是否传入
    if (!userId) {
      ctx.body = {code: 0, message: "未传入用户id"};
      return;
    }
    // 2.开始查询数据
    const {limit, offset} = ctx;
    const result = await momentService.getContentListForOneUser(userId, limit, offset);
    ctx.body = {code: 200, message: "成功", contentList: result};
  }
  
  /**
   * @description: 修改动态内容content
   */
  async modifyOneContent(ctx, next) {
    const {content, contentId} = ctx.request.body;
    const result = await momentService.modifyContentById(contentId, content);
    if (result) {
      ctx.body = {code: 200, message: "成功", data: result}
    }
  }
  
  /**
   * @description: 删除动态 基于contentId
   */
  async deleteOneContent(ctx, next) {
    const {contentId} = ctx.request.body;
    const result = await momentService.deleteContentById(contentId);
    if (result) {
      ctx.body = {code: 200, message: "成功", data: result}
    }
  }
}

module.exports = new MomentController();