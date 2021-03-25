const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs'); // used in custom method on the static property of this schema

const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'The \'email\' field must have an email address',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect email or password');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Incorrect email or password');
          }
          return user; // now user is available
        });
    });
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
