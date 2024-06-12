const {CONTENT_IS_EMPTY} = require("../config/errorEnum");
const momentService = require("../service/moment.service");

/**
 * @description: 校验发表动态的内容
 */
async function verifyContent(ctx, next) {
  const content = ctx.request.body.content;
  // 1.校验动态动态是否为空
  if (!content) {
    return ctx.app.emit("error", CONTENT_IS_EMPTY, ctx);
  }
  // todo 2.校验文本内容是否合法
  await next();
}

/**
 * @description: 校验是否有权限修改动态
 */
async function verifyModify(ctx, next) {
  const {content, contentId} = ctx.request.body;
  // 1.校验请求参数是否合法
  if (!content) {
    return ctx.app.emit("error", CONTENT_IS_EMPTY, ctx);
  }
  if (!contentId) {
    return ctx.body = {code: 0, message: "contentId不能为空"};
  }
  // 2.校验该用户是否有权修改这条动态
  const {id} = ctx.userInfo;
  // isPermission是true时有修改权限
  const isPermission = await momentService.checkModifyPermission(contentId, id);
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
 * @description: 校验是否有权限删除动态
 */
async function verifyDelete(ctx, next) {
  const {contentId} = ctx.request.body;
  // 1.校验修改后的内容是否为空
  if (!contentId) {
    return ctx.body = {code: 0, message: "contentId不能为空"};
  }
  // 2.校验该用户是否有权删除这条动态
  const {id} = ctx.userInfo;
  // isPermission是true时有删除权限
  const isPermission = await momentService.checkModifyPermission(contentId, id);
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