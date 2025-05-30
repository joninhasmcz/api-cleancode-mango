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
  async auth(email) {
      if(!email) {
        return MissingParamError('email')
      }

  }
}



describe('Auth UseCase', () => {
  test('Should return null if no email is provided', async () => {
      const sut = new AuthUseCase()
      const promise =  sut.auth()
      expect(promise).rejects.toThrow()
  })
})