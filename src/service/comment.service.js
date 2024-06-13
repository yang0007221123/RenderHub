const connection = require("../app/mysql");

class CommentService {
  /**
   * @description: 评论内容入库
   */
  async saveComment(userId, content, momentId, commentId) {
    try {
      const statement = `
        INSERT INTO comment (user_id, content, moment_id, comment_id) VALUES (?, ?, ?, ?);
      `;
      const [result] = await connection.execute(statement, [userId, content, momentId, commentId]);
      return result;
    } catch (e) {
      console.log("err-", e);
    }
  }
  
  
}

module.exports = new CommentService();