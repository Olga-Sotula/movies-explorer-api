const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value), message: 'Невалидный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

/*userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorBadAuth('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorBadAuth('Неправильные почта или пароль');
          }

          return user;
        });
    });
};*/

module.exports = mongoose.model('user', userSchema);
