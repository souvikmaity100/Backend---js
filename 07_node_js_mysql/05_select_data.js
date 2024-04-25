const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_data"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM student_data", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // console.log(fields);
  });
});