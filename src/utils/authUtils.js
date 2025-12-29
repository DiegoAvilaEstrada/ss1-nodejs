const bcrypt = require('bcrypt');

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class AuthUtils {
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  validatePassword(passwordOriginal, passwordHashed) {
    return bcrypt.compareSync(passwordOriginal, passwordHashed);
  }

  generateVerificationCode() {
    let code = '';
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * CHARACTERS.length);
      code += CHARACTERS.charAt(index);
    }
    return code;
  }

  createExpirationDate(minutes) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  createExpirationLocalDateTime(minutes) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }
}

module.exports = new AuthUtils();

