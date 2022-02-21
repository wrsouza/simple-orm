const User = require('../../app/models/user')

class UserSeeder {
  static async run() {
    const data = [
      { 
        name: 'User 01', 
        email: 'user01@domain.com', 
        password: '123456', 
        birthdate: '1974-05-15',
        age: 47,
        salary: 5678.75
      },
      { 
        name: 'User 02', 
        email: 'user02@domain.com', 
        password: '123456', 
        birthdate: '1986-09-05',
        age: 35,
        salary: 2125.12
      },
      { 
        name: 'User 03', 
        email: 'user03@domain.com', 
        password: '123456', 
        birthdate: '1993-02-15',
        age: 29,
        salary: 1345.27
      }
    ]
    
    for (let item of data) {
      await User.create(item)
    }
  }
}

module.exports = UserSeeder
