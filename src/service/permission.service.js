const connection = require("../app/mysql");

/**
 * @description: 验证操作权限
 */
class PermissionService {
  /**
   * @description: 验证用户是否有操作某张表的权限
   * resourceName: 表的名称
   * resourceId：表中被操作的字段的id
   * userId：用户id
   * @return: true表示有操作权限
   */
  async verifyPermission(resourceName, resourceId, userId) {
    try {
      const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
      const [result] = await connection.execute(statement, [resourceId, userId]);
      console.log("result", result);
      return !!result.length;
    } catch (e) {
      console.log("err-verifyPermission", e);
    }
  }
}

module.exports = new PermissionService();