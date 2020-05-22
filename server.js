const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'OLA_requests',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/insert_entry', (req, res) => {
  const sql = `INSERT INTO base_requests (name, contact, request) VALUES ('name', 'glof@glof.glof', 'please help me')`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log('1 record inserted');
  });
  res.send({ insert: `one record inserted as ${process.env.DB_USER}` });
})

