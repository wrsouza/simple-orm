const Model = require('../../infra/database/model')

class Order extends Model {
  constructor() {
    super()
    this.table = 'orders'
    this.fillable = [ 'user_id', 'total' ]
    this.hidden = ['created_at', 'updated_at']
  }
}

module.exports = Order
