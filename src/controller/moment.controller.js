const momentService = require("../service/moment.service");
const queryByIdService = require("../service/queryById.service");
const labelService = require("../service/label.service");
const {getIdListByInsertResult} = require("../utils/handleMysqlData");
const sendResponse = require("../utils/sendResponse");

/**
 * @description: 动态相关
 */
class MomentController {
  /**
   * @description:  发表动态---发表动态的同时需要将新标签入库，并且保存moment与label的关系数据
   */
  async createMoment(ctx, next) {
    // todo 需要用事务优化
    // 1.动态内容入库，获取到momentId
    const result = await momentService.createMoment(ctx.userInfo.userId, ctx.request.body.content); // 动态内容入库
    const momentId = result.insertId;
    
    // 2.标签列表入库
    let insertLabelIdList = []; // 新入库的标签的id
    if (!!ctx.saveLabelStrList?.length) {
      const insertResult = await labelService.createLabel(ctx.saveLabelStrList);
      insertLabelIdList = getIdListByInsertResult(insertResult);
    }
    
    // 3.保存moment与label的关系数据
    const totalLabelIdList = [...ctx.existsIdList, ...insertLabelIdList];
    const res = await momentService.momentAddLabel(momentId, totalLabelIdList);
    if (res) {
      return sendResponse(ctx, 200, "success", "成功");
    }
  }
  
  /**
   * @description: 获取动态列表
   */
  async getList(ctx, next) {
    const {limit, offset} = ctx;
    const result = await momentService.getContentList(limit, offset);
    sendResponse(ctx, 200, "success", "成功", result);
  }
  
  /**
   * @description: 获取某用户的动态列表
   */
  async getContentListForOneUser(ctx, next) {
    const {userId} = ctx.request.body;
    // 1. userId是否传入
    if (!userId) {
      return sendResponse(ctx, 400, "fail", "未传入用户id");
    }
    // 2.开始查询数据
    const {limit, offset} = ctx;
    const result = await momentService.getContentListForOneUser(userId, limit, offset);
    sendResponse(ctx, 200, "success", "成功", result);
  }
  
  /**
   * @description: 修改动态内容content
   */
  async modifyOneContent(ctx, next) {
    const {content, momentId} = ctx.request.body;
    const result = await momentService.modifyContentById(momentId, content);
    if (result) {
      sendResponse(ctx, 200, "success", "成功");
    }
  }
  
  /**
   * @description: 基于momentId删除某一条动态
   */
  async deleteOneContent(ctx, next) {
    const {momentId} = ctx.request.body;
    const result = await momentService.deleteContentById(momentId);
    if (result) {
      sendResponse(ctx, 200, "success", "成功", result);
    }
  }
  
  /**
   * @description: 查看某条动态的详情
   */
  async verifyDetail(ctx, next) {
    const {momentId} = ctx.request.body;
    // 1.校验传参
    if (!momentId) {
      return sendResponse(ctx, 400, "fail", "参数momentId缺失");
    }
    // 2.查询动态是否存在
    const isExists = await queryByIdService.queryById("moment", momentId);
    if (!isExists) {
      return sendResponse(ctx, 400, "fail", "该动态不存在");
    }
    // 3.数据库查询动态的详情
    const result = await momentService.viewMomentDetail(momentId);
    sendResponse(ctx, 200, "success", "成功", result);
  }
}

module.exports = new MomentController();