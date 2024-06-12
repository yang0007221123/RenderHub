/**
 * @description: 处理分页请求参数
 * 默认10条，起始页为1
 */
async function handlePage(ctx, next) {
  let {currentPage, pageSize} = ctx.request.body;
  !currentPage && (currentPage = "1"); // 默认第1页
  !pageSize && (pageSize = "10"); // 默认1页10条数据
  // 将处理好的limit与offset直接放在ctx身上
  ctx.offset = String((Number(currentPage) - 1) * Number(pageSize));
  ctx.limit = String(pageSize);
  await next();
}

module.exports = {
  handlePage
}