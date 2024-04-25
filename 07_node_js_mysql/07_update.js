const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_data"
});

con.connect(function(err) {
  if (err) throw err;
  const sql = "UPDATE `student_data` SET `age` = '24' WHERE `id` = 1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record's updated");
  });
});