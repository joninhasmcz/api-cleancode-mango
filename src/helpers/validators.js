module.exports = class Validators {
  isValid (email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }
}
