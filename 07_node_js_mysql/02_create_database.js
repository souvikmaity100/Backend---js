var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

// create database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "CREATE DATABASE node_data"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created", result);
  });
});


// drop database
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "DROP DATABASE mango"
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Database droped", result);
//   });
// });