jest.mock('validator', () => ({
  isEmailValid: true,

  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}))

const validator = require('validator')
const EmailValidator = require('./email-validator')
const MissingParamError = require('../utils/errors/missing-param-error')

const makeSut = () => {
  return new EmailValidator()
}

describe('email-validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })
  test('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email')
    expect(isEmailValid).toBe(false)
  })
  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_mail@gmail.com')
    expect(validator.email).toBe('any_mail@gmail.com')
  })
  test('Should throw if no email is provided', () => {
    const sut = makeSut()
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
