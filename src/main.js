const {SERVER_PORT} = require("./config/server");
const app = require("./app/index"); // 导入app
require("./utils/handleError"); // 监听app的错误事件

// 监听服务启动
app.listen(SERVER_PORT, () => {
  console.log("RenderHub服务启动成功");
})