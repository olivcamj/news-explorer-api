const ServerError = require('../errors/server-err');
const { serverErr } = require('../utils/constants');

const throwServerError = () => {
  throw new ServerError(serverErr);
};

const catchError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? throwServerError : message,
  });
  next();
};

module.exports = catchError;
