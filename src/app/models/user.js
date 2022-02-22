const Model = require('../../infra/database/model')

class User extends Model {
  constructor() {
    super()
    this.table = 'users'
    this.fillable = [ 'name', 'email', 'password', 'birthdate', 'age', 'salary' ]
    this.hidden = ['password', 'created_at', 'updated_at']
  }
}

module.exports = new User
