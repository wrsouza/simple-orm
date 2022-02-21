const Schema = require('../../infra/database/schema')

class CreateProductsTable {
  static up() {
    Schema.create('products', (table) => {
      table.id();
      table.string('description', 100)
      table.string('slug').unique()
      table.number('price', 10, 2)
      table.integer('stock')
      table.timestamps()
      table.engine = 'InnoDB'
    });
  }
  
  static down() {
    Schema.dropIfExists('products');
  }
}

module.exports = CreateProductsTable
