const mysql = require('../models/db')

const tableConfig =
  'id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,' +
  ' name VARCHAR(255) DEFAULT "unspecified",' +
  ' contact VARCHAR(255) NOT NULL,' +
  ' title VARCHAR(255) DEFAULT "request",' +
  ' due DATE DEFAULT "2020-05-05",' +
  ' description TEXT NOT NULL,' +
  ' course VARCHAR(255) DEFAULT "unspecified"'

const newRequests = `CREATE TABLE IF NOT EXISTS new_requests(${tableConfig})`
const archiveRequests = `CREATE TABLE IF NOT EXISTS archive_requests(${tableConfig})`

mysql.query(newRequests, (err) => {
  if (err) throw err
})

mysql.query(archiveRequests, (err) => {
  if (err) throw err
})
