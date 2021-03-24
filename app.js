const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const { createUser, login } = require('./controllers/user');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middleware/auth.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, userRouter);
app.use('/articles', auth, articleRouter);
app.use(() => {
  throw new NotFoundError('Page not found');
});

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
