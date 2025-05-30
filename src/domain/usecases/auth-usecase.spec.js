const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {}
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
  return {
    sut,
    loadUserByEmailRepositorySpy
  }

}

describe('Auth UseCase', () => {
  test('Should throw null if no email is provided', async () => {
    const { sut} = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut  = new AuthUseCase()
    const promise = sut.auth('any_mail@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })
  test('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut  = new AuthUseCase({})
    const promise = sut.auth('any_mail@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })
  test('Should throw null if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_mail@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_mail@mail.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_mail@mail.com')
  })

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy }  = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('any_email@mail.com', 'valid_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy} = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('any_mail@mail.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })
})