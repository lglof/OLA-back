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
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/insert_entry', (req, res) => {
  console.log('inserting');
  var contents = {
    name: req.body.name || "unspecified",
    contact: req.body.contact || "unspecified",
    request: req.body.request || "unspecified",
    due: req.body.due || "2020-05-05"
  }
  console.log(contents);
  const sql = `INSERT INTO base_requests (name, contact, request, due) VALUES ('${contents.name}', '${contents.contact}', '${contents.request}', '${contents.due}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": result }));
  });
});
app.get('/query', (req, res) => {
  console.log("here comes the query!");
  var params = req.query;
  var keys = Object.keys(params);
  console.log(params);
  var sql = "SELECT * FROM base_requests";
  for (var i = 0; i < keys.length; i += 1) {
    sql += i > 0 ? " AND" : " WHERE";
    sql += params[keys[i]].length ? ` ${keys[i]}='${params[keys[i]]}'` : '';
  }
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });

})
app.delete('/delete_entry', (req, res) => {
  console.log('deleting');
  var id = req.body.id;
  const sql = `DELETE FROM base_requests WHERE id = '${id}'`;
  con.query(sql, (err, result) => {
    if (err) throw err;
  });
  console.log(`record number ${id} deleted`);
  res.send();
})
