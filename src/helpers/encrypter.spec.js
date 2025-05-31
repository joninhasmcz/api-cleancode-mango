const bcrypt = require('bcrypt')

class Encrypter {
    async compare(value, hash) {
        const isValid = await bcrypt.compare(value, hash)
        return isValid
    }
}
const makeSut = () => {
    return new Encrypter()
}

describe('Encrypter', () => {
    test('Should return true if validator returns true', async () => {
        const sut = makeSut()
        const isValid = await sut.compare('any_password', 'hashed_value')
        expect(isValid).toBe(true)
    })
    test('Should return false if validator returns false', async () => {
        const sut = makeSut()
        bcrypt.isValid = false
        const isValid = await sut.compare('any_password', 'hashed_value')
        expect(isValid).toBe(false)
    })
})