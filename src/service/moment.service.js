const connection = require("../app/mysql");

class MomentService {
  /**
   * @description: 内容入库
   */
  async createMoment(userId, content) {
    try {
      const statement = "INSERT INTO `moment` (user_id, content) VALUES (?, ?);";
      const [result] = await connection.execute(statement, [userId, content]);
      return result;
    } catch (e) {
      console.log("err-createMoment", e);
    }
  }
  
  /**
   * @description: 校验userId是否存在
   */
  async checkUserId(userId) {
    try {
      const statement = "SELECT id FROM user WHERE id = ?;";
      const [result] = await connection.execute(statement, [userId]);
      return result;
    } catch (e) {
      console.log("err-checkUserId", e);
    }
  }
  
  /**
   * @description:获取动态列表
   */
  async getContentList(limit, offset) {
    console.log("limit-offset", limit, offset);
    try {
      const statement = `
      SELECT
        m.id contentId, m.content content, m.createTime createTime, m.updateTime updateTime,
      JSON_OBJECT("userId",u.id, "username", u.username) AS userInfo
      FROM moment AS m
      LEFT JOIN USER AS u
      ON m.user_id = u.id
      LIMIT ? OFFSET ?;`;
      const [result] = await connection.execute(statement, [limit, offset]);
      return result;
    } catch (e) {
      console.log("err-getContentList", e);
    }
  }
  
  /**
   * @description: 获取某用户的动态列表
   */
  async getContentListForOneUser(userId, limit, offset) {
    console.log("limit-offset", limit, offset);
    try {
      const statement = `
        SELECT
        m.id contentId, m.content content, m.createTime createTime, m.updateTime updateTime,
        JSON_OBJECT("userId",u.id, "username", u.username) AS userInfo
        FROM moment AS m
        LEFT JOIN user AS u
        ON m.user_id = u.id
        WHERE m.user_id = ?
        LIMIT ? OFFSET ?;
       `;
      const [result] = await connection.execute(statement, [userId, limit, offset]);
      return result;
    } catch (e) {
      console.log("err-getContentList", e);
    }
  }
}

module.exports = new MomentService();