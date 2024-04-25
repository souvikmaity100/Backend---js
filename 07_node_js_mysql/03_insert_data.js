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
});



const sql = "INSERT INTO `student_data` (`name`, `age`, `fav_sub`) VALUES ('sam', 18, 'math')";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows ,"record inserted");
});






