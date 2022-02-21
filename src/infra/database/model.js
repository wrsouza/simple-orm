const getConnection = require('./connection')

class Model {
  constructor() {
    this.primaryKey = 'id'
    this.primaryValue = ''
    this.table = ''
    this.fillable = []
    this.hidden = []
    this.instance = true
    this.results = null
  }

  static async create(data) {
    let self
    if (!this.instance) {
      self = new this.prototype.constructor()
    } else {
      self = this
    }
    const fields = []
    const values = []
    for (const field of Object.keys(data)) {
      if (self.fillable.includes(field)) {
        fields.push(field)
        values.push(data[field])
      }
    }
    const query = `INSERT INTO ${self.table} ( ?? ) VALUES ( ? )`
    self.results = await self.exec(query, [fields, values])
    return await self.find(self.results.insertId)
  }

  async find(id) {
    const query = `SELECT * FROM ${this.table} WHERE ?? = ?`
    this.results = await this.exec(query, [this.primaryKey, id])
    if (this.results.length) {
      return this.results[0]
    }
    return null
  }

  static async find(id) {
    let self
    if (!this.instance) {
      self = new this.prototype.constructor()
    } else {
      self = this
    }
    const query = `SELECT * FROM ${self.table} WHERE ?? = ?`
    self.results = await self.exec(query, [self.primaryKey, id])
    if (self.results.length) {
      return self.results[0]
    }
    return null
  }

  static async all() {
    let self
    if (!this.instance) {
      self = new this.prototype.constructor()
    } else {
      self = this
    }
    const query = `SELECT * FROM ${self.table}`
    self.results = await self.exec(query, [])
    return self.results
  }

  async update(data) {
    let self
    if (!this.instance) {
      self = new this.prototype.constructor()
    } else {
      self = this
    }
    const fields = []
    const values = []
    for (const field of Object.keys(data)) {
      if (self.fillable.includes(field)) {
        fields.push(field)
        values.push(data[field])
      }
    }
    fields.push(self.primaryKey)
    values.push(self.primaryValue)
    const query = `UPDATE ${self.table} SET ?? = ? WHERE ?? = ?`
    await self.exec(query, [fields, values])
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
