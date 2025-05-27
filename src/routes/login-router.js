const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  validate_email(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.validate_email(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        console.log("ENTROU AQ")
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unautorizedError()
      }

      return HttpResponse.ok({ accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
