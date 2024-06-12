const fs = require("fs");

// 注册所有的路由
function registerRouters(app) {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (!file.endsWith("router.js")) continue;  // 不是以.router.js结尾则继续遍历
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = registerRouters;