const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_data"
});

con.connect(function(err) {
  if (err) throw err;
  const name = "sam"
  const age = 18;
  const sql = "SELECT * FROM student_data where name = ? or age < ?"
  con.query(sql, [name, age] , function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // console.log(fields);
  });
});


// Escape query values by using the mysql.escape() method:
// con.connect(function(err) {
//   if (err) throw err;
//   const name = "sam"
//   const sql = "SELECT * FROM student_data where name = " + mysql.escape(name)
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     // console.log(fields);
//   });
// });