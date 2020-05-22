const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'OLA_requests',
});

module.exports = {
  insertEntry() {
    const sql = `INSERT INTO base_requests (name, contact, request) VALUES ('name', 'glof@glof.glof', 'please help me')`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log('1 record inserted');
    });
  }
}
