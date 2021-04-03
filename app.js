const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const limiter = require('./middleware/rate-limit');
const { requestLogger, errorLogger } = require('./middleware/logger.js');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const { createUser, login } = require('./controllers/user');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middleware/auth.js');
const catchError = require('./middleware/catchError.js');
const { notFound, serverCrash } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { NODE_ENV, MONGO_URI } = process.env;

require('dotenv').config();

const app = express();

app.use(requestLogger); // enabling the request logger

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
    throw new Error(serverCrash);
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
  throw new NotFoundError(notFound);
});

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use(catchError);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
