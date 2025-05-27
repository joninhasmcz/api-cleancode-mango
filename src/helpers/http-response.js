const MissingParamError = require('./missing-param-error')
const UnautorizedError = require('./unautorized-error')
const ServerError = require('./server-error')

module.exports = class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static unautorizedError () {
    return {
      statusCode: 401,
      body: new UnautorizedError()
    }
  }

  static ok (accessToken) {
    return {
      statusCode: 200,
      body: accessToken

    }
  }
}
