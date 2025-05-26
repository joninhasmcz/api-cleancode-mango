const MissingParamError = require('./missing-param-error')
const UnautorizedError = require('./unautorized-error')

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }
  static serverError() {
    return {
      statusCode: 500,
    }
  }
  static unautorizedError() {
    return {
      statusCode: 401,
      body: new UnautorizedError()
    }
  }

}

