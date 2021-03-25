const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/user.js');

// returns information about the logged-in user (email and name)
userRouter.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
}), getUser);

module.exports = userRouter;
