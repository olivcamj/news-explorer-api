const express = require('express');
  const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./user');
const articleRouter = require('./article');

const NotFoundError = require('../errors/not-found-err');
const { notFound } = require('../utils/constants');
const auth = require('../middleware/auth.js');
const { createUser, login } = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);
router.use('/users', auth, userRouter);
router.use('/articles', articleRouter);
router.use('/*', () => {
  throw new NotFoundError(notFound);
});

module.exports = router;
