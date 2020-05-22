const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'OLA_requests',
});

con.query(
  'CREATE TABLE base_requests (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL, request TEXT NOT NULL, due DATE )',
  (err) => {
    if (err) throw err;
  }
);

con.query(
  'CREATE TABLE helpful_OLAs (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) DEFAULT "lars", skills JSON)',
  (err) => {
    if (err) throw err;
  }
);
