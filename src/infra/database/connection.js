require('dotenv').config()
const Mysql = require('mysql')

const options = {
  driver: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

const getConnection = () => {
  return new Promise((resolve, reject) => {
    const conn = Mysql.createConnection(options)
    conn.connect()
    resolve(conn)
  })
}

module.exports = getConnection
