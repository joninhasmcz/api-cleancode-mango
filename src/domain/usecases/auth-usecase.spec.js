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

class AuthUseCase {
  async auth(email) {
      if(!email) {
        throw new Error('Email is required')
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