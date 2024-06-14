const sendResponse = require("../utils/sendResponse");

/**
 * @description: 创建标签请求的校验
 */
async function verifyLabel(ctx, next) {
  const {labelList} = ctx.request.body;
  if (!labelList?.length) {
    return sendResponse(ctx, 400, "fail", "请求参数不合法");
  }
  await next();
}

/**
 * @description: 删除标签时的校验
 */
async function verifyDeleteLabel(ctx, next) {
  const {idList} = ctx.request.body;
  // id必须全部为number类型
  const allNum = idList?.every(id => typeof id === 'number');
  if (!Array.isArray(idList) || !idList?.length || !allNum) {
    return sendResponse(ctx, 400, "fail", "请求参数不合法");
  }
  await next();
}


module.exports = {
  verifyLabel,
  verifyDeleteLabel
}