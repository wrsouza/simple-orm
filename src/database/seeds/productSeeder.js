const Product = require('../../app/models/product')

class ProductSeeder {
  static async run() {
    for (let i = 0; i<10; i++) {
      await Product.create({ 
        description: `Product ${i + 1}`, 
        slug: `product-${i + 1}`,
        price: Math.random() * 5673.75 + 100,
        stock: Math.random() * 30 + 5
      })
    }
  }
}

module.exports = ProductSeeder
