const express = require('express')
const router = express.Router()
const PublicRoute = require('./public.route')

// Public Route
router.use('/', PublicRoute)

module.exports = router