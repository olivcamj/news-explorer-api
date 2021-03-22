const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('No User with a matching ID could be found');
    }
    res.send(user);
  })
  .catch(next);
