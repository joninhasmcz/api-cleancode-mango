module.exports = class UnautorizedError extends Error {
    constructor () {
      super('Unautorized')
      this.name = 'UnautorizedError'
    }
}