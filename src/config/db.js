const mongoose = require('mongoose')
const logger = require('../utils/logger')
const dotenv = require('dotenv')

dotenv.config()

const connectionMongoDB = async () => {
  let uri = process.env.MONGODB_URI

  const runningInDocker = process.env.DOCKER === 'true'

  if (runningInDocker) {
    uri = 'mongodb://root:2326252@mongo-db:27017/template_express?authSource=admin'
  }

  if (!uri) {
    logger.error('MongoDB URI not found')
    process.exit(1)
  }
  try {
    await mongoose.connect(uri)
    logger.info('MongoDB Connected!')
  } catch (error) {
    logger.error('MongoDB No Connected: ' + error.message)
    process.exit(1)
  }
}

module.exports = connectionMongoDB
