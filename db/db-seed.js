const mysql = require('mysql')
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

con.query('CREATE DATABASE IF NOT EXISTS OLA_requests', (error) => {
  if (error) throw error
})
