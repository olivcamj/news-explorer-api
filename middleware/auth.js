const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err.js');
const { authorizationErr, bearer } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace(bearer, '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new UnauthorizedError(authorizationErr);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'practicum');
  } catch (err) {
    throw new UnauthorizedError(authorizationErr);
  }

  req.user = payload; // adding the payload to the Request object

  next(); // passing the request further along
};
