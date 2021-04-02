const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger.js');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const { createUser, login } = require('./controllers/user');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middleware/auth.js');

const { PORT = 3000 } = process.env;
const { NODE_ENV, MONGO_URI } = process.env;

require('dotenv').config();

const app = express();

app.use(requestLogger); // enabling the request logger

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // a maximum of 100 requests from one IP
});

// applying the rate-limiter
app.use(limiter);

mongoose.connect((NODE_ENV === 'production' ? MONGO_URI : 'mongodb://localhost:27017/news'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(helmet());

app.use(express.json());

app.use(cors());
app.options('*', cors()); // preflight

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/users', auth, userRouter);
app.use('/articles', auth, articleRouter);
app.use(() => {
  throw new NotFoundError('Page not found');
});

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
