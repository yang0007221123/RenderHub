const {CONTENT_IS_EMPTY, USER_IS_NOT_EXISTS} = require("../config/errorEnum");
const momentService = require("../service/moment.service");
const permissionService = require("../service/permission.service");
const labelService = require("../service/label.service");
const sendResponse = require("../utils/sendResponse");

/**
 * @description: 校验发表动态的内容
 */
async function verifyCreateContent(ctx, next) {
  // 1.该用户是否存在于数据库中
  const {userId} = ctx.userInfo;
  const res = await momentService.checkUserId(userId); // 校验userId是否存在
  if (!res?.length) {
    return ctx.app.emit("error", USER_IS_NOT_EXISTS, ctx);
  }
  
  // 2.校验动态内容  todo 校验文本内容是否合法
  const {content} = ctx.request.body;
  if (!content) {
    return ctx.app.emit("error", CONTENT_IS_EMPTY, ctx);
  }
  
  // 3.动态是否附带标签列表
  const {labelList} = ctx.request.body;
  if (!!labelList?.length) {
    const labelIdList = labelList.map(item => item.id).filter(value => !!value);
    const existsLabelList = await labelService.queryLabelByIdList(labelIdList);
    const existsIdList = existsLabelList.map(item => item.id);
    ctx.existsIdList = existsIdList;
    const setExistsIdList = new Set(existsIdList);
    // 筛选得到需要存到数据库的标签列表
    if (labelIdList.length !== existsIdList) {
      ctx.saveLabelStrList = labelList.filter(item => !setExistsIdList.has(item.id)).map(value => value.label);
    }
  }
  await next();
}

/**
 * @description: 修改动态内容前的校验
 */
async function verifyModify(ctx, next) {
  const {content, momentId} = ctx.request.body;
  // 1.校验请求参数是否合法
  if (!content) {
    return ctx.app.emit("error", CONTENT_IS_EMPTY, ctx);
  }
  if (!momentId) {
    return sendResponse(ctx, 400, "fail", "contentId不能为空");
  }
  // 2.校验该用户是否有权修改这条动态
  const {userId} = ctx.userInfo;
  // isPermission是true时有修改权限
  const isPermission = await permissionService.verifyPermission("moment", momentId, userId);
  if (!isPermission) {
    return sendResponse(ctx, 400, "fail", "该用户暂无修改该动态的权限");
  }
  // 3.修改动态
  await next();
}

/**
 * @description: 删除动态前的校验
 */
async function verifyDelete(ctx, next) {
  // 1.校验修改后的内容是否为空
  const {momentId} = ctx.request.body;
  if (!momentId) {
    return sendResponse(ctx, 400, "fail", "contentId不能为空");
  }
  
  // 2.校验该用户是否有权删除这条动态
  const {userId} = ctx.userInfo;
  // isPermission是true时有删除权限
  const isPermission = await permissionService.verifyPermission("moment", momentId, userId);
  if (!isPermission) {
    return sendResponse(ctx, 401, "fail", "该用户暂无删除该动态的权限");
  }
  
  await next();
}

module.exports = {
  verifyCreateContent,
  verifyModify,
  verifyDelete
}