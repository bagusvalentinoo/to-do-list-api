require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const TaskController = require('@controllers/public/task/task.controller')
const ApiKeyController = require('@controllers/public/api-key/api_key.controller')

// Api Key Route
router.post('/api-key/generate', async (req, res) => {
  await ApiKeyController.store(req, res)
})

// Task Routes
router.get('/tasks', ApiKey, async (req, res) => {
  await TaskController.index(req, res)
})

router.post('/tasks', ApiKey, async (req, res) => {
  await TaskController.store(req, res)
})

router.get('/tasks/:id', ApiKey, async (req, res) => {
  await TaskController.show(req, res)
})

router.put('/tasks/:id', ApiKey, async (req, res) => {
  await TaskController.update(req, res)
})

router.delete('/tasks/:id', ApiKey, async (req, res) => {
  await TaskController.destroySingle(req, res)
})

router.delete('/tasks', ApiKey, async (req, res) => {
  await TaskController.destroyBulk(req, res)
})

module.exports = router