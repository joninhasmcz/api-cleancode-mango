const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')
const UnautorizedError = require('../helpers/unautorized-error')
const ServerError = require('../helpers/server-error')

const makeSut = () => {
  const authUseCasePsy = makeAuthUseCase()
  const emailValidatorSpy = makeEmailValidator()
  authUseCasePsy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCasePsy, emailValidatorSpy)

  return {
    sut,
    authUseCasePsy,
    emailValidatorSpy
  }
}

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid(email) {
      this.email = email
      return this.isEmailValid
    }
  }
  const emailValidatorSpy = new EmailValidatorSpy()
  emailValidatorSpy.isEmailValid = true
  return emailValidatorSpy
}

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    async auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  return new AuthUseCaseSpy()
}

const makeEmailValidatorWithError = () => {
  class EmailValidatorSpy {
    isValid() {
      throw new Error()
    }
  }
  return new EmailValidatorSpy()
}

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    async auth () {
      throw new Error()
    }
  }
  return new AuthUseCaseSpy()
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpRequest = {
      body: {
        password: 'any_password',
        email: 'invalid_email'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 500 if no httpRequest.body is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call AuthUseCase with correct params', async () => {
    const { sut, authUseCasePsy } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)
    expect(authUseCasePsy.email).toBe(httpRequest.body.email)
    expect(authUseCasePsy.password).toBe(httpRequest.body.password)
  })
  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authUseCasePsy } = makeSut()
    authUseCasePsy.accessToken = null
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnautorizedError())
  })
  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authUseCasePsy } = makeSut()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(authUseCasePsy.accessToken)
  })
  test('Should return 500 if no authUseCase is provided', async () => {
    const sut = new LoginRouter()

    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if authUseCase has no auth method', async () => {
    class AuthUseCaseSpy {}
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)

    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 500 if authUseCase throws', async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError()
    const sut = new LoginRouter(authUseCaseSpy)

    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

test('Should return 500 if no EmailValidator is provided', async () => {
  const authUseCaseSpy = makeAuthUseCase()
  const sut = new LoginRouter(authUseCaseSpy)

  const httpRequest = {
    body: {
      email: 'invalid_email@mail.com',
      password: 'invalid_password'
    }
  }
  const httpResponse = await sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
  expect(httpResponse.body).toEqual(new ServerError())
})

test('Should return 500 if no EmailValidator has no isValid method', async () => {
  const authUseCaseSpy = makeAuthUseCase()
  class EmailValidatorSpy {}
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)

  const httpRequest = {
    body: {
      email: 'invalid_email@mail.com',
      password: 'invalid_password'
    }
  }
  const httpResponse = await sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
  expect(httpResponse.body).toEqual(new ServerError())
})

test('Should return 500 if EmailValidator throws', async () => {
  const authUseCaseSpy = makeAuthUseCase()
  const emailValidatorSpy = makeEmailValidatorWithError()
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)

  const httpRequest = {
    body: {
      email: 'invalid_email@mail.com',
      password: 'invalid_password'
    }
  }
  const httpResponse = await sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
  expect(httpResponse.body).toEqual(new ServerError())
})
test('Should call EmailValidator with correct email', async () => {
  const { sut, emailValidatorSpy } = makeSut()
  const httpRequest = {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
  await sut.route(httpRequest)
  expect(emailValidatorSpy.email).toBe(httpRequest.body.email)
})
})
