const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnautorizedError = require('../helpers/unautorized-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  const authUseCasePsy = new AuthUseCaseSpy()
  authUseCasePsy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCasePsy)

  return {
    sut,
    authUseCasePsy
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
      const {sut} = makeSut()
      const httpRequest = {
        body: {
          password: 'any_password'
        }
      }
      const httpResponse = sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))

  })
  test('Should return 500 if no httpRequest is provided', () => {
    const {sut} = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if no httpRequest.body is not provided', () => {
    const {sut} = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should call AuthUseCase with correct params', () => {
    const {sut, authUseCasePsy} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCasePsy.email).toBe(httpRequest.body.email)
    expect(authUseCasePsy.password).toBe(httpRequest.body.password)
  })
  test('Should return 401 if invalid credentials are provided', () => {
    const { sut, authUseCasePsy } = makeSut()
    authUseCasePsy.accessToken = null
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnautorizedError())
  })
  test('Should return 200 if valid credentials are provided', () => {
      const {sut, authUseCasePsy} = makeSut()
      const httpRequest = {
        body: {
          email: 'valid_email@mail.com',
          password: 'valid_password'
        }
      }
      const httpResponse = sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.body.accessToken).toEqual(authUseCasePsy.accessToken)
  })
  test('Should return 500 if no authUseCase is provided', () => {
    const sut = new LoginRouter()

    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if authUseCase has no auth method', () => {
    class AuthUseCaseSpy {}
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)

    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })


})