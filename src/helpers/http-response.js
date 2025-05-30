const MissingParamError = require('../errors/missing-param-error')
const UnautorizedError = require('../errors/unauthorized-error')
const ServerError = require('../errors/server-error')

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
