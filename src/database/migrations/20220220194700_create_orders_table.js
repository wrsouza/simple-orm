const Schema = require('../../infra/database/schema')

class CreateOrdersTable {
  static up() {
    Schema.create('orders', (table) => {
      table.id();
      table.integer('user_id')
      table.foreign('user_id').references('id').on('users').onDelete('CASCADE')
      table.number('total', 10, 2)
      table.timestamps()
      table.engine = 'InnoDB'
    });
  }
  
  static down() {
    Schema.dropIfExists('orders');
  }
}

module.exports = CreateOrdersTable
