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

const exec = (conn, query, data) => {
  return new Promise((resolve, reject) => {
    conn.query(query, data, (error, results, fields) => {
      if (error) reject(error)
      console.log('results',results)
      console.log('fields', fields)
      const { insertId: id } = results
      resolve({ conn, id })
    })
  })
}

const createUsersTable = async (conn) => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB
    `
  return exec(conn, query, [])
}

const insertUserSeeder = ({ conn }) => {
  const query = `INSERT INTO users ( ?? ) VALUES ( ?, ?, ? )`
  const fields = ['name', 'email', 'password']
  const data = [fields, 'Willian', 'wrdigital@hotmail.com', '123456']
  exec(conn, query, data)
}

const updateUserSeeder = (conn) => {
  const query = `UPDATE users SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
  const data = ['name', 'Willian 2', 'email', 'wrdigital2@hotmail.com', 'password', '654321', 'id', 1]
  return exec(conn, query, data)
}

const deleteUserSeeder = (conn) => {
  const query = `DELETE FROM users WHERE ?? = ?`
  const data = ['id', 1];
  return exec(conn, query, data)
}

const setDelay = (conn, seconds) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(conn), 1000 * seconds)
  })
}

getConnection()
  .then(conn => createUsersTable(conn))
  .then(conn => setDelay(conn, 5))
  .then(conn => insertUserSeeder(conn))
  .then(conn => setDelay(conn, 5))
  .then(conn => updateUserSeeder(conn))
  .then(conn => setDelay(conn, 5))
  .then(conn => deleteUserSeeder(conn))
  .then(conn => setDelay(conn, 5))
  .then(conn => conn.end())
  .catch(err => console.log(err))
