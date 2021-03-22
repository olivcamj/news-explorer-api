const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
// Temporary authorization solution
app.use((req, res, next) => {
  req.user = {
    _id: '6052500d7f0774385b8dfa8a', // _id of the test user created in db
  };

  next();
});

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
