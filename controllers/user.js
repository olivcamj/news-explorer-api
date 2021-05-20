const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  noMatchFound,
  invalidInput,
  invalidUser,
  unauthorizedInput,
  userExists,
  invalidData,
  castErr,
} = require('../utils/constants');

const SALT_ROUNDS = 10;
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(noMatchFound);
    }
    res.send(user);
  })
  .catch(next);

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!password || !email) {
    throw new BadRequestError(invalidInput);
  }
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        email,
        name,
        password: hash,
      })
        .then((user) => {
          res.status(201).send({
            id: user._id,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.name === castErr) {
            throw new BadRequestError(invalidUser);
          }
          if (err.name === 'MongoError' || err.code === '11000' || err.name === 'ValidationError') {
            throw new ConflictError(userExists);
          }
          next(err);
        })
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(unauthorizedInput);
      }
      // authentication successful! user is in the user variable
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'practicum',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      if (err.name === castErr) {
        throw new BadRequestError(invalidData);
      }
      next(err);
    })
    .catch(next);
};
