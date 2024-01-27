require('module-alias/register')
const response = require('@helpers/http/response')
const TaskService = require('@services/public/task.service')
const TaskForTaskResource = require('@resources/product/task/task_for_task_resource')
const { sequelize } = require('@models')

const index = async (req, res) => {
  try {
    const tasks = await TaskService.getTasks(req)

    return response.success(
      res,
      200,
      'Data has been successfully retrieved',
      tasks
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const task = await TaskService.createTask(req, t)
    await t.commit()

    return response.success(
      res,
      201,
      'Data has been successfully created',
      new TaskForTaskResource(task),
      'task'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const show = async (req, res) => {
  try {
    const task = await TaskService.findTaskById(req.params.id)

    return response.success(
      res,
      200,
      'Data has been successfully retrieved',
      new TaskForTaskResource(task),
      'task'
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const update = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const findTask = await TaskService.findTaskById(req.params.id)
    const updatedTask = await TaskService.updateTask(req, findTask, t)
    await t.commit()
    const task = await TaskService.findTaskById(updatedTask.id)

    return response.success(
      res,
      200,
      'Data has been successfully updated',
      new TaskForTaskResource(task),
      'task'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroySingle = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const task = await TaskService.findTaskById(req.params.id)
    await TaskService.deleteTask(task, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Data has been successfully deleted'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroyBulk = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    await TaskService.deleteTasks(req, req.body.ids, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Data has been successfully deleted'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroySingle,
  destroyBulk
}