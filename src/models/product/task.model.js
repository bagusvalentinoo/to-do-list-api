const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Task extends Model {
    static associate(models) {
      // define association here
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Oops! Title already exists'
        },
        validate: {
          notEmpty: {
            msg: 'Oops! Title cannot be empty'
          },
          notNull: {
            msg: 'Oops! Title cannot be empty'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('None', 'In Progress', 'Done'),
        allowNull: false,
        defaultValue: 'None',
        validate: {
          notEmpty: {
            msg: 'Oops! Status cannot be empty'
          },
          notNull: {
            msg: 'Oops! Status cannot be empty'
          },
          isIn: {
            args: [['None', 'In Progress', 'Done']],
            msg: 'Oops! Status must be None, In Progress, or Done'
          }
        }
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low',
        validate: {
          notEmpty: {
            msg: 'Oops! Priority cannot be empty'
          },
          notNull: {
            msg: 'Oops! Priority cannot be empty'
          },
          isIn: {
            args: [['Low', 'Medium', 'High']],
            msg: 'Oops! Priority must be Low, Medium, or High'
          }
        }
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'Oops! Due Date must be a date'
          }
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Task
}