const {SERVER_PORT} = require("./config/server");
const app = require("./app/index"); // 导入app
require("./utils/handleRequestError"); // 监听app的错误事件

// 监听服务启动
app.listen(SERVER_PORT, () => {
  console.log(`RenderHub本地服务启动成功，端口地址${SERVER_PORT}`);
})