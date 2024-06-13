const connection = require("../app/mysql");

class QueryByIdService {
  /**
   * @description: 基于不同的table名和id值去查找数据
   * @return: true表示查找的数据存在
   */
  async queryById(tableName, id) {
    try {
      // 指定某张表，基于表的id值，查询表中是否有该条数据
      const statement = `SELECT * FROM ${tableName} WHERE id = ?;`;
      const [result] = await connection.execute(statement, [id]);
      return !!result.length;
    } catch (e) {
      console.log("err-queryById", e);
    }
  }
}

module.exports = new QueryByIdService();