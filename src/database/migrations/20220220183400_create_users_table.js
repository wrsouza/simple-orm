const Schema = require('../../infra/database/schema')

class CreateUsersTable {
  static up() {
    Schema.create('users', (table) => {
      table.id();
      table.string('name', 100)
      table.string('email').unique()
      table.string('password')
      table.date('birthdate').nullable()
      table.integer('age', 3).nullable()
      table.number('salary', 10, 2).nullable()
      table.timestamps()
      table.engine = 'InnoDB'
    });
  }
  
  static down() {
    Schema.dropIfExists('users');
  }
}

module.exports = CreateUsersTable
