const Model = require('../../infra/database/model')

class Product extends Model {
  constructor() {
    super()
    this.table = 'products'
    this.fillable = [ 'description', 'slug', 'price', 'stock' ]
    this.hidden = ['created_at', 'updated_at']
  }
}

module.exports = new Product
