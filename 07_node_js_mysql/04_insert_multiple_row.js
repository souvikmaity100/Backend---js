const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_data"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "INSERT INTO `student_data` (`name`, `age`, `fav_sub`) VALUES ?";
  const students = [
    ['gita', 15, 'Bengali'],
    ['ram', 20, 'Physics'],
    ['mita', 23, 'History']
  ];
  con.query(sql, [students], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});