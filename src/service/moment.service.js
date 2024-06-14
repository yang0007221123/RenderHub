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
   * @description: 给 内容moment 批量添加 标签label的id
   */
  async momentAddLabel(momentId, idList) {
    try {
      const values = idList.map(labelId => `(${momentId}, ${labelId})`).join(', ');
      const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES ${values}`;
      const [result] = await connection.execute(statement);
      return result;
    } catch (e) {
      console.log("err-momentAddLabel", e);
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
   * @description: 分页获取动态列表
   */
  async getContentList(limit, offset) {
    console.log("limit-offset", limit, offset);
    try {
      const statement = `
      SELECT
        m.id contentId, m.content content, m.createTime createTime, m.updateTime updateTime,
      JSON_OBJECT("userId",u.id, "username", u.username) AS userInfo,
      (SELECT COUNT(*) FROM \`comment\` WHERE comment.moment_id = m.id) commentCount
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
  
  /**
   * @description: 修改某个用户的某条动态
   */
  async modifyContentById(momentId, content) {
    try {
      const statement = "UPDATE moment SET content = ? WHERE id = ?; ";
      const [result] = await connection.execute(statement, [content, momentId]);
      return result;
    } catch (e) {
      console.log("err-modifyContentBrId", e);
    }
  }
  
  /**
   * @description: 删除某个用户的某条动态
   */
  async deleteContentById(momentId) {
    try {
      const statement = "DELETE FROM moment WHERE id = ?;";
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (e) {
      console.log("err-deleteContentById", e);
    }
  }
  
  /**
   * @description: 查看某条动态的详情
   */
  async viewMomentDetail(momentId) {
    try {
      const statement = `
        SELECT
          m.id momentId, m.content content, m.createTime createTime, m.updateTime updateTime,
          JSON_OBJECT("userId", u.id, "userName", u.username) userInfo,
          JSON_ARRAYAGG(
            JSON_OBJECT("commentId", c.id, "content", c.content, "userInfo", JSON_OBJECT("userId", u2.id, "userName", u2.username))
          ) comments
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN comment c ON m.id = c.moment_id
        LEFT JOIN user u2 ON c.user_id = u2.id
        WHERE m.id = ?
        GROUP BY m.id;
      `;
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (e) {
      console.log("err-viewMomentDetail", e);
    }
  }
}

module.exports = new MomentService();