import * as Mysql from 'mysql'

const connection = () => {
  return new Promise((resolve, reject) => {
    const conn = Mysql.createConnection(options)
    conn.connect()
    resolve(conn)
  })
}

export default connection