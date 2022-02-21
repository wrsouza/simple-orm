const User = require('../../app/models/user')
const Product = require('../../app/models/product')
const Order = require('../../app/models/order')
const OrderItem = require('../../app/models/orderItem')

class OrderSeeder {
  static async run() {
    const users = await User.all()
    const products = await Product.all()

    for (let i = 0; i<50; i++) {
      const items = []
      let total = 0
      for (let x = 0; x < Math.floor(Math.random() * 5 + 1); x++) {
        const idxProduct = Math.floor(Math.random() * (products.length - 1))
        const product = products[idxProduct]
        const quantity = Math.floor(Math.random() * 5 + 1)
        items.push({
          product_id: product.id,
          price: product.price,
          quantity
        })
        total += product.price * quantity
      }
      const idxUser = Math.floor(Math.random() * (users.length - 1))
      const user = users[idxUser]
      const order = await Order.create({ 
        user_id: user.id,
        total
      })
      for (let item of items) {
        await OrderItem.create({
          ...item,
          order_id: order.id
        })
      }
    }
  }
}

module.exports = OrderSeeder
