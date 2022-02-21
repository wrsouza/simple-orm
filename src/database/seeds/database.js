const UserSeeder = require('./userSeeder')
const ProductSeeder = require('./productSeeder')
const OrderSeeder = require('./orderSeeder')

class DatabaseSeeder {
  static handler() {
    return [
      UserSeeder,
      ProductSeeder,
      OrderSeeder
    ]
  }
}

module.exports = DatabaseSeeder
