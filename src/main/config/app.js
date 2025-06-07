const express = require('express')
const app = express()
const setupApp = require('./setup')
const setupRoutes = require('./setupRoutes')

setupApp(app)
setupRoutes(app)

module.exports = app
