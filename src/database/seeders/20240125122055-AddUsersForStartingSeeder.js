require('module-alias/register')
const bcrypt = require('bcrypt')
const { User } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userOfficer = await User.create({
      name: 'Admin 01',
      username: 'admin_01',
      email: 'admin_01@example.com',
      password: bcrypt.hashSync('qwerty12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userOfficer.assignRole('Admin')

    const userMember1 = await User.create({
      name: 'User 01',
      username: 'user_01',
      email: 'user01@gmail.com',
      password: bcrypt.hashSync('qwerty12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember1.assignRole('User')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profiles', null, {})
    await queryInterface.bulkDelete('user_role', null, {})
    await queryInterface.bulkDelete('user_tokens', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}