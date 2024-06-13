/**
 * @description: 创建标签请求的校验
 */
async function verifyLabel(ctx, next) {
  const {label} = ctx.request.body;
  console.log("label", label);
  if (!label) {
    return ctx.body = {code: 0, message: "参数label不能为空"};
  }
  await next();
}

module.exports = {
  verifyLabel
}