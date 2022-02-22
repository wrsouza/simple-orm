const getConnection = require('./connection')

class Model {
  constructor() {
    this.primaryKey = 'id'
    this.primaryValue = ''
    this.table = ''
    this.fillable = []
    this.hidden = []
    this.results = null
    this.selectList = []
    this.whereList = []
  }

  async create(data) {
    const fields = []
    const values = []
    for (const field of Object.keys(data)) {
      if (this.fillable.includes(field)) {
        fields.push(field)
        values.push(data[field])
      }
    }
    const query = `INSERT INTO ${this.table} ( ?? ) VALUES ( ? )`
    this.results = await this.exec(query, [fields, values])
    return await this.find(this.results.insertId)
  }

  async find(id) {
    const query = `SELECT * FROM ${this.table} WHERE ?? = ?`
    this.results = await this.exec(query, [this.primaryKey, id])
    if (this.results.length) {
      return this.results[0]
    }
    return null
  }

  where(v1, v2, v3) {
    this.whereList = []
    let field, type, value
    if (Array.isArray(v1)) {
      v1.forEach(item => {
        field = item[0]
        type = (item.length > 2) ? item[1] : '='
        value = (item.length > 2) ? item[2] : item[1]
        this.whereList.push({ field, type, value })
      })
      return this
    }
    field = v1
    type = (v3 === undefined) ? '=' : v2
    value = (v3 === undefined) ? v2 : v3
    this.whereList.push({ field, type, value })
    return this
  }

  async get() {
    const select = this.selectList.length 
      ? this.selectList.join(', ') 
      : '*'
    const where = this.whereList.length 
      ? `WHERE ${this.whereList.map(item => `?? ${item.type} ?`).join(', ')}` 
      : ''
    let query = `SELECT ${select} FROM ${this.table} ${where}`
    this.results = await this.exec(query, [this.whereList.map(item => item.field), ...this.whereList.map(item => item.value)])
    if (this.results.length) {
      return this.results
    }
    return null
  }

  async all() {    
    const query = `SELECT * FROM ${this.table}`
    this.results = await this.exec(query, [])
    return this.results
  }

  async update(data) {    
    const fields = []
    const values = []
    for (const field of Object.keys(data)) {
      if (this.fillable.includes(field)) {
        fields.push(field)
        values.push(data[field])
      }
    }
    fields.push(this.primaryKey)
    values.push(this.primaryValue)
    const query = `UPDATE ${this.table} SET ?? = ? WHERE ?? = ?`
    return await this.exec(query, [fields, values])
  }

  exec(query, data) {
    return new Promise((resolve, reject) => {
      console.log(query)
      getConnection()
        .then(conn => { 
          conn.query(query, data, (error, results, fields) => {
            if (error) reject(error)
            conn.end()
            resolve(results)
          })
        })
    })
  }
}

module.exports = Model
