const connection = require("../app/mysql");

class LabelService {
  /**
   * @description: （批量）创建标签
   */
  async createLabel(labelList) {
    try {
      const placeholders = labelList.map(() => '(?)').join(',');
      const statement = `INSERT INTO label (label) VALUES ${placeholders};`;
      const [insertResult] = await connection.execute(statement, labelList);
      return insertResult;
    } catch (e) {
      console.log("err-createLabel", e);
    }
  }
  
  /**
   * @description: (批量)删除标签
   */
  async deleteLabelByIds(idList) {
    try {
      // flag=0 是系统默认的标签，不可删除
      const statement = `DELETE FROM label WHERE id IN (${idList.map(() => '?').join(',')}) AND flag != 0;`;
      const [result] = await connection.execute(statement, idList);
      return result;
    } catch (e) {
      console.log("err-deleteLabelByIds", e);
    }
  }
  
  /**
   * @description: （批量）查询标签列表
   */
  async queryLabelByIdList(labelIdList) {
    try {
      console.log("queryLabelByIdList", labelIdList);
      const statement = `SELECT label.id id FROM label WHERE id in (${labelIdList.map(() => "?").join(",")});`;
      const [result] = await connection.execute(statement, labelIdList);
      return result;
    } catch (e) {
      console.log("", e);
    }
  }
  
}

module.exports = new LabelService();