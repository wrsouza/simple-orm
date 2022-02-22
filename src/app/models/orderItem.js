const Model = require('../../infra/database/model')

class OrderItem extends Model {
  constructor() {
    super()
    this.table = 'order_items'
    this.fillable = [ 'order_id', 'product_id', 'quantity', 'price' ]
    this.hidden = ['created_at', 'updated_at']
  }
}

module.exports = new OrderItem
