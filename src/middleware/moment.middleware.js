const {CONTENT_IS_EMPTY} = require("../config/errorEnum");
const momentService = require("../service/moment.service");
const permissionService = require("../service/permission.service");

/**
 * @description: 校验发表动态的内容
 */
async function verifyContent(ctx, next) {
  const {content} = ctx.request.body;
  // 1.校验动态动态是否为空
  if (!content) {
    return ctx.app.emit("error", CONTENT_IS_EMPTY, ctx);
  }
  // todo 2.校验文本内容是否合法
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
    return ctx.body = {code: 0, message: "contentId不能为空"};
  }
  // 2.校验该用户是否有权修改这条动态
  const {userId} = ctx.userInfo;
  // isPermission是true时有修改权限
  const isPermission = await permissionService.verifyPermission("moment", momentId, userId);
  if (!isPermission) {
    return ctx.body = {
      code: 0,
      message: "该用户暂无修改该动态的权限"
    }
  }
  // 3.修改动态
  await next();
}

/**
 * @description: 删除动态前的校验
 */
async function verifyDelete(ctx, next) {
  const {momentId} = ctx.request.body;
  // 1.校验修改后的内容是否为空
  if (!momentId) {
    return ctx.body = {code: 0, message: "contentId不能为空"};
  }
  // 2.校验该用户是否有权删除这条动态
  const {userId} = ctx.userInfo;
  // isPermission是true时有删除权限
  const isPermission = await permissionService.verifyPermission("moment", momentId, userId);
  if (!isPermission) {
    return ctx.body = {code: 0, message: "该用户暂无删除该动态的权限"}
  }
  // 3.删除动态
  await next();
}

module.exports = {
  verifyContent,
  verifyModify,
  verifyDelete
}