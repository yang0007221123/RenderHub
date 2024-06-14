/**
 * @description: 基于数据库返回的insertResult得到更新后的数据的id列表
 */
function getIdListByInsertResult(insertResult) {
  const {insertId, affectedRows} = insertResult;
  const idList = [];
  for (let i = 1; i <= affectedRows; i++) {
    idList.push(insertId + i - 1);
  }
  return idList;
}

module.exports = {
  getIdListByInsertResult
}