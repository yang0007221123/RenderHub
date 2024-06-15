const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "47.113.177.51",  // 数据库地址
  port: 3306,
  database: "renderhub", // 需要连接的数据库名称
  user: "root",
  password: "Chang0530.",
  connectionLimit: 100  // 最大连接数量
})

// 检查数据库书否连接成功
connectionPool.getConnection((err, connection) => {
  // 1.是否可以连接数据库
  if (err) {
    console.log("数据库连接失败999", err);
    return;
  }
  
  // 2.尝试与数据库连接
  connection.connect((err) => {
    if (err) {
      console.log("数据库尝试连接失败", err);
    } else {
      console.log("数据库连接成功");
    }
  })
})


const connection = connectionPool.promise();

module.exports = connection;
