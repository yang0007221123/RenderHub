/**
 * @description: 给客户端的 响应消息 与 响应状态码
 */
function sendResponse(ctx, statusCode, status, message, data = null) {
  ctx.status = statusCode;
  ctx.body = {
    status: status,
    message: message,
    data: data
  };
}

module.exports = sendResponse;



