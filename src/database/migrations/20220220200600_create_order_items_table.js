const Schema = require('../../infra/database/schema')

class CreateOrderItemsTable {
  static up() {
    Schema.create('order_items', (table) => {
      table.id();
      table.integer('order_id')
      table.foreign('order_id').references('id').on('orders').onDelete('CASCADE')
      table.integer('product_id')
      table.foreign('product_id').references('id').on('products').onDelete('CASCADE')
      table.integer('quantity')
      table.number('price', 10, 2)
      table.timestamps()
      table.engine = 'InnoDB'
    });
  }
  
  static down() {
    Schema.dropIfExists('order_items');
  }
}

module.exports = CreateOrderItemsTable
