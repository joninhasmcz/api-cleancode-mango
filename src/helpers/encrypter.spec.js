class Encrypter {
    async compare(password, hashedPassword) {
        return true
    }
}
const makeSut = () => {
    return new Encrypter()
}

describe('Encrypter', () => {
    test('Should return true if validator returns true', async () => {
        const sut = makeSut()
        const isValid = await sut.compare('any_password', 'hashed_password')
        expect(isValid).toBe(true)
    })
})