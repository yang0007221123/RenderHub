const momentService = require("../service/moment.service");
const {USER_IS_NOT_EXISTS} = require("../config/errorEnum");
const queryByIdService = require("../service/queryById.service");

/**
 * @description: 动态相关
 */
class MomentController {
  /**
   * @description:  发表动态
   */
  async createMoment(ctx, next) {
    console.log("ctx.userInf", ctx.userInfo);
    const {userId} = ctx.userInfo;
    // 1.userId是否存在
    const res = await momentService.checkUserId(userId); // 校验userId是否存在
    if (!res?.length) {
      return ctx.app.emit("error", USER_IS_NOT_EXISTS, ctx);
    }
    // 2.内容入库
    const result = await momentService.createMoment(userId, ctx.request.body.content); // 动态内容入库
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
    const {content, momentId} = ctx.request.body;
    const result = await momentService.modifyContentById(momentId, content);
    if (result) {
      ctx.body = {code: 200, message: "成功", data: result}
    }
  }
  
  /**
   * @description: 基于momentId删除某一条动态
   */
  async deleteOneContent(ctx, next) {
    const {momentId} = ctx.request.body;
    const result = await momentService.deleteContentById(momentId);
    if (result) {
      ctx.body = {code: 200, message: "成功", data: result}
    }
  }
  
  /**
   * @description: 查看某条动态的详情
   */
  async verifyDetail(ctx, next) {
    const {momentId} = ctx.request.body;
    // 1.校验传参
    if (!momentId) {
      return ctx.body = {code: 0, message: "参数momentId缺失"};
    }
    // 2.查询动态是否存在
    const isExists = await queryByIdService.queryById("moment", momentId);
    if (!isExists) {
      return ctx.body = {code: 0, message: "该动态不存在"};
    }
    // 3.数据库查询动态的详情
    const result = await momentService.viewMomentDetail(momentId);
    ctx.body = {code: 200, message: "成功", data: result};
  }
}

module.exports = new MomentController();