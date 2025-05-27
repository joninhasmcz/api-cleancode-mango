module.exports = class Validators {

  isValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}