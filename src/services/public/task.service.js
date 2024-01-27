require('module-alias/register')
const response = require('@helpers/http/response')
const { orderBy } = require('@helpers/model/query')
const { convertToCapitalizedCase } = require('@helpers/string/string_formatted')
const TaskForTaskResource = require('@resources/product/task/task_for_task_resource')
const TaskRule = require('@rules/product/task.rule')
const { Op, Task } = require('@models')

const getTasks = async (req) => {
  const query = req.query
  const order = orderBy(query)
  const { limit, offset } = response.pagination(query.page, query.limit)
  const {
    search,
    status,
    priority
  } = query

  const responsePayloadTask = {
    limit,
    offset,
    order
  }

  if (search) {
    responsePayloadTask.where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ]
    }
  }

  if (status && (status === 'None' || status === 'In Progress' || status === 'Done')) {
    responsePayloadTask.where = {
      ...responsePayloadTask.where,
      status
    }
  }

  if (priority && (priority === 'Low' || priority === 'Medium' || priority === 'High')) {
    responsePayloadTask.where = {
      ...responsePayloadTask.where,
      priority
    }
  }

  const { count, rows } = await Task.findAndCountAll(responsePayloadTask)

  return response.paginate(
    count,
    query.page,
    limit,
    'tasks',
    TaskForTaskResource.collection(rows)
  )
}

const createTask = async (req, t) => {
  const {
    title,
    description,
    status,
    priority,
    due_date
  } = req.body

  if (due_date && TaskRule.isDueDateLessThanToday(due_date))
    response.throwNewError(400, 'Oops! Due date cannot be less than today')

  return await Task.create({
    title,
    description: description || null,
    status,
    priority,
    due_date: due_date || null,
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
}

const findTaskById = async (id) => {
  const task = await Task.findByPk(id)

  return task ? task : response.throwNewError(400, 'Oops! Task not found')
}

const updateTask = async (req, task, t) => {
  const {
    title,
    description,
    status,
    priority,
    due_date
  } = req.body

  if (due_date && TaskRule.isDueDateLessThanToday(due_date))
    response.throwNewError(400, 'Oops! Due date cannot be less than today')

  return await task.update({
    title,
    description: description || null,
    status,
    priority,
    due_date: due_date || null,
    updated_at: new Date()
  }, { transaction: t })
}

const deleteTask = async (task, t) => {
  return await task.destroy({ transaction: t })
}

const deleteTasks = async (req, ids, t) => {
  const tasks = await Task.findAll({
    where: { id: { [Op.in]: ids } }
  })

  if (tasks.length === 0)
    response.throwNewError(400, 'Oops! Tasks not found')

  if (tasks.length !== ids.length)
    response.throwNewError(400, 'Oops! Some tasks not found')

  for (const task of tasks) {
    await deleteTask(task, t)
  }

  return true
}

module.exports = {
  getTasks,
  createTask,
  findTaskById,
  updateTask,
  deleteTask,
  deleteTasks
}