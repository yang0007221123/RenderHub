/**
 * @description: UserService---与数据库交互操作
 */
const connection = require("../app/mysql");

class UserService {
  // 用户注册--保存用户注册信息
  async saveRegisterUser(userInfo) {
    const {username, password} = userInfo;
    // 数据库操作
    const statement = "INSERT INTO `user` (username, password) VALUES (?, ?);" // 保存注册用户信息sql语句
    const [result] = await connection.execute(statement, [username, password]);  // 执行sql语句
    // console.log("saveRegisterUser", result);
    return result;
  }
  
  // 查询用户名是否已存在
  async findUserName(username) {
    const statement = "SELECT * FROM `user` WHERE username = ?;"
    const [result] = await connection.execute(statement, [username]);
    // console.log("checkUserName", result);
    return result;
  }
}

module.exports = new UserService();