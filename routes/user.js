const userRouter = require('express').Router();

const { getUser } = require('../controllers/user.js');

// returns information about the logged-in user (email and name)
userRouter.get('/me', getUser);

module.exports = userRouter;
