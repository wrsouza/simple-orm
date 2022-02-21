const getConnection = require('./connection')

class Schema {
  constructor() {
    this.engine = ''
    this.fields = []
  }

  static create(tableName, makeFields) {
    const self = new Schema()
    makeFields(self)
    let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`
    const rows = []
    for (let field of self.fields) {
      rows.push(field.join(' '))
    }
    query += `\n`
    query += rows.join(', \n')
    query += `\n`
    query += `)`
    if (self.engine) {
      query += ` ENGINE=${self.engine}`
    }
    self.exec(query)
  }

  exec(query) {
    return new Promise((resolve, reject) => {
      console.log(query)
      getConnection()
        .then(conn => conn.query(query, (error, results, fields) => {
          if (error) reject(error)
          resolve()
        })).catch(err => console.log(err))
    })
  }

  id() {
    this.fields.push([
      'id',
      'INT',
      'PRIMARY KEY',
      'AUTO_INCREMENT'
    ])
    return this
  }

  string(fieldName, value = 255) {
    this.fields.push([
      fieldName.toLowerCase(),
      `VARCHAR(${value})`,
      `NOT NULL`
    ])
    return this
  }

  number(fieldName, value, decimal = 0) {
    this.fields.push([
      fieldName.toLowerCase(),
      `FLOAT(${value}, ${decimal})`,
      `NOT NULL`
    ])
    return this
  }

  integer(fieldName, value) {
    this.fields.push([
      fieldName.toLowerCase(),
      value ? `INT(${value})` : `INT`,
      `NOT NULL`
    ])
    return this
  }

  date(fieldName) {
    this.fields.push([
      fieldName.toLowerCase(),
      `DATE`,
      `NOT NULL`
    ])
    return this
  }

  datetime(fieldName) {
    this.fields.push([
      fieldName.toLowerCase(),
      `DATETIME`,
      `NOT NULL`
    ])
    return this
  }

  text(fieldName) {
    this.fields.push([
      fieldName.toLowerCase(),
      `TEXT`,
      `NOT NULL`
    ])
    return this
  }

  unique() {
    let field = this.fields.pop()
    const index = field.findIndex(f => f.indexOf('UNIQUE') !== -1)
    if (index !== -1) {
      field[index] = `UNIQUE`
    } else {
      field.push(`UNIQUE`)
    }
    this.fields[this.fields.length] = field
    return this
  }

  default(value) {
    let field = this.fields.pop()
    const index = field.findIndex(f => f.indexOf('DEFAULT') !== -1)
    if (!index) {
      field.push(`DEFAULT ${value}`)
    } else {
      field[index] = `DEFAULT ${value}`
    }
    this.fields[this.fields.length] = field
    return this
  }

  nullable() {
    const currentField = this.fields.pop()
    const fieldNullable = currentField.filter(field => field !== 'NOT NULL')
    this.fields[this.fields.length] = fieldNullable
    return this
  }

  foreign(fieldName) {
    this.fields.push([
      `FOREIGN KEY (${fieldName})`
    ])
    return this
  }

  references(fieldName) {
    const currentField = this.fields.pop()
    currentField.push(`REFERENCES`)
    currentField.push(`(${fieldName})`)
    this.fields[this.fields.length] = currentField
    return this
  }

  on(tableName) {
    const currentField = this.fields.pop()
    const index = currentField.findIndex(f => f.indexOf('REFERENCES') !== -1)
    currentField.splice(index + 1, 0, tableName);
    this.fields[this.fields.length] = currentField
    return this
  }

  onDelete(value) {
    const currentField = this.fields.pop()
    currentField.push(`ON DELETE ${value}`)
    this.fields[this.fields.length] = currentField
    return this
  }

  timestamps() {
    this.fields.push([
      'created_at',
      'TIMESTAMP',
      'NOT NULL',
      'DEFAULT CURRENT_TIMESTAMP'
    ])
    this.fields.push([
      'updated_at',
      'TIMESTAMP',
      'NOT NULL',
      'DEFAULT CURRENT_TIMESTAMP',
      'ON UPDATE CURRENT_TIMESTAMP'
    ])
    return this
  }

  static dropIfExists(tableName) {
    const self = new Schema()
    let query = `DROP TABLE IF EXISTS ${tableName}`
    self.exec(query)
  }
}

module.exports = Schema
