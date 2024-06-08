/**
 * @description: 服务配置
 */
const dotenv = require("dotenv");

dotenv.config(); // 获取到当前的环境配置

// process.env是当前的环境配置，从中解构需要的静态配置
module.exports = {
  SERVER_PORT  // 服务端口
  
} = process.env
