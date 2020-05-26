const mysql = require('mysql')
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'OLA_requests'
})

con.connect(error => {
  if (error) throw error
  console.log('connected!')
})

module.exports = con
