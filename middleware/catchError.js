const ServerError = require('../errors/server-err');

const catchError = (err, req, res, next) => {
  const { statusCode = 500 } = err;

  res.status(statusCode).send({
    err: new ServerError('An error occurred on the server'),
  });

  next();
};

module.exports = catchError;
