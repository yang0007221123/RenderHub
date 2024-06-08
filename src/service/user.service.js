/**
 * @description: UserService---与数据库交互操作
 * @param:
 * @return:
 */
const connection = require("../app/mysql");

class UserService {
  // 用户注册--保存用户注册信息
  async saveRegisterUser(userInfo) {
    const {username, password} = userInfo;
    
    // 数据库操作
    const statement = "INSERT INTO `user` (username, password) VALUES (?, ?);" // 保存注册用户信息sql语句
    const [result] = await connection.execute(statement, [username, password]);  // 执行sql语句
    return result;
  }
  
  // 用户注册--查询用户名
  
  
}

module.exports = new UserService();