require('module-alias/register')
const { Task } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const today = new Date()
    const oneWeekAgoDate = new Date(new Date().setDate(new Date().getDate() - 7))
    const oneWeekThreeDaysAgoDate = new Date(new Date().setDate(new Date().getDate() - 10))
    const oneMonthAgoDate = new Date(new Date().setDate(new Date().getDate() - 30))
    const dueDateNextMonthDate = new Date(new Date().setDate(new Date().getDate() + 30))
    const dueDateTwoMonthsDate = new Date(new Date().setDate(new Date().getDate() + 60))

    await Task.bulkCreate([
      {
        title: 'Complete annual report',
        description: 'Submit the annual report to the board members by the end of January',
        status: 'Done',
        priority: 'High',
        due_date: oneWeekAgoDate.setHours(23, 59, 59, 999),
        created_at: oneMonthAgoDate.setHours(9, 0, 0, 0),
        updated_at: oneWeekThreeDaysAgoDate.setHours(14, 0, 0, 0)
      },
      {
        title: 'Organize team meeting',
        description: 'Discuss the progress of the ongoing projects and plan for the upcoming quarter',
        status: 'Done',
        priority: 'Medium',
        due_date: oneWeekAgoDate.setHours(23, 59, 59, 999),
        created_at: oneMonthAgoDate.setHours(9, 0, 0, 0),
        updated_at: oneWeekThreeDaysAgoDate.setHours(15, 45, 0, 0)
      },
      {
        title: 'Prepare for the sales pitch',
        description: 'Prepare a detailed presentation for the upcoming sales pitch',
        status: 'Done',
        priority: 'High',
        due_date: oneWeekAgoDate.setHours(23, 59, 59, 999),
        created_at: oneMonthAgoDate.setHours(9, 0, 0, 0),
        updated_at: oneWeekThreeDaysAgoDate.setHours(16, 30, 0, 0)
      },
      {
        title: 'Review quarterly budget',
        description: 'Review the current quarterly budget and make necessary adjustments',
        status: 'Done',
        priority: 'Low',
        due_date: oneWeekAgoDate.setHours(23, 59, 59, 999),
        created_at: oneMonthAgoDate.setHours(9, 0, 0, 0),
        updated_at: oneWeekThreeDaysAgoDate.setHours(17, 15, 0, 0)
      },
      {
        title: 'Schedule team training',
        description: 'Schedule a team training session for the new employees',
        status: 'Done',
        priority: 'Medium',
        due_date: oneWeekAgoDate.setHours(23, 59, 59, 999),
        created_at: oneMonthAgoDate.setHours(9, 0, 0, 0),
        updated_at: oneWeekThreeDaysAgoDate.setHours(18, 0, 0, 0)
      },
      {
        title: 'Update project timeline',
        description: 'Update the project timeline based on the recent progress',
        status: 'In Progress',
        priority: 'High',
        due_date: dueDateNextMonthDate.setHours(23, 59, 59, 999),
        created_at: today.setHours(9, 0, 0, 0),
        updated_at: today.setHours(9, 0, 0, 0)
      },
      {
        title: 'Review customer feedback',
        description: 'Review the customer feedback and address any outstanding issues',
        status: 'In Progress',
        priority: 'Medium',
        due_date: dueDateNextMonthDate.setHours(23, 59, 59, 999),
        created_at: today.setHours(9, 0, 0, 0),
        updated_at: today.setHours(9, 0, 0, 0)
      },
      {
        title: 'Finalize product design',
        description: 'Finalize the product design based on the feedback from the design team',
        status: 'In Progress',
        priority: 'High',
        due_date: dueDateNextMonthDate.setHours(23, 59, 59, 999),
        created_at: today.setHours(9, 0, 0, 0),
        updated_at: today.setHours(9, 0, 0, 0)
      },
      {
        title: 'Prepare marketing campaign',
        description: 'Prepare a marketing campaign to promote the upcoming product launch',
        status: 'In Progress',
        priority: 'Low',
        due_date: dueDateNextMonthDate.setHours(23, 59, 59, 999),
        created_at: today.setHours(9, 0, 0, 0),
        updated_at: today.setHours(9, 0, 0, 0)
      },
      {
        title: 'Schedule product launch',
        description: 'Schedule the product launch event and invite the relevant stakeholders',
        status: 'None',
        priority: 'High',
        due_date: dueDateTwoMonthsDate.setHours(23, 59, 59, 999),
        created_at: today.setHours(9, 0, 0, 0),
        updated_at: today.setHours(9, 0, 0, 0)
      },
      {
        title: 'Prepare for the board meeting',
        description: 'Prepare a detailed presentation for the upcoming board meeting',
        status: 'None',
        priority: 'Medium',
        due_date: dueDateTwoMonthsDate.setHours(23, 59, 59, 999),
        created_at: today.setHours(9, 0, 0, 0),
        updated_at: today.setHours(9, 0, 0, 0)
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {})
  }
}
