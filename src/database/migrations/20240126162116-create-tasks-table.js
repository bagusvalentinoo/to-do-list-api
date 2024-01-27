/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.DataTypes.ENUM('None', 'In Progress', 'Done'),
        allowNull: false,
        defaultValue: 'None'
      },
      priority: {
        type: Sequelize.DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low'
      },
      due_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks')
  }
}
