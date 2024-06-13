const connection = require("../app/mysql");

class LabelService {
  /**
   * @description: 创建标签
   */
  async createLabel(label) {
    try {
      const statement = "INSERT INTO label (label) VALUES (?);";
      const [result] = await connection.execute(statement, [label]);
      return result;
    } catch (e) {
      console.log("err-createLabel", e);
    }
  }
}

module.exports = new LabelService();