require('module-alias/register')
const { convertToFormatDate } = require('@helpers/string/string_formatted')

class TaskForTaskResource {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.status = data.status
    this.priority = data.priority
    this.due_date = convertToFormatDate(data.due_date)
    this.created_at = convertToFormatDate(data.created_at)
    this.updated_at = convertToFormatDate(data.updated_at)
  }

  static collection(dataCollection) {
    return dataCollection.map(data => new TaskForTaskResource(data))
  }
}

module.exports = TaskForTaskResource