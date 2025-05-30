// const makeAuthUseCaseSpy = () => {
//   class AuthUseCase {
//     async auth (email) {
//       if (!email) {
//         return null;
//       }
//       return true;
//
//     }
//
//     return new AuthUseCase();
//
//   }
//
// }
// const makeSut = () => {
//   const authUseCaseSpy = makeAuthUseCaseSpy()
// }

const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth(email, password) {
      if(!email) {
        throw new MissingParamError('email')
      }
      if(!password) {
        throw new MissingParamError('password')
      }
  }
}

describe('Auth UseCase', () => {
  test('Should throw null if no email is provided', async () => {
      const sut = new AuthUseCase()
      const promise =  sut.auth()
      expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
  test('Should throw null if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise =  sut.auth('any_mail@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})