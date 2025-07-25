// article error messages

const forbiddenDelete = 'You can only delete your own articles';
const fieldsRequired = 'All fields are required to create an article';
const noSavedArticles = 'no saved articles';
const invalidData = 'Invalid data';
const articleNotFound = 'Article not found';

// user error messages

const invalidUser = 'Invalid user';
const userExists = 'User already exists';
const unauthorizedInput = 'Incorrect password or email';
const invalidInput = 'Email and password fields should not be empty';
const noMatchFound = 'No User with a matching ID could be found';

// general response

const castErr = 'CastError';
const authorizationErr = 'Authorization Error';
const bearer = 'Bearer ';
const notFound = 'Page not found';
const serverCrash = 'Server will crash now';
const serverErr = 'An error occurred on the server';
const reachedLimit = 'Too many requests, please try again later';

module.exports = {
  invalidData,
  userExists,
  forbiddenDelete,
  fieldsRequired,
  noSavedArticles,
  articleNotFound,
  invalidUser,
  unauthorizedInput,
  invalidInput,
  noMatchFound,
  castErr,
  authorizationErr,
  bearer,
  notFound,
  serverCrash,
  serverErr,
  reachedLimit,
};
