const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  // eslint-disable-next-line
  password: process.env.DB_PASS, 
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})
module.exports = { pool }
