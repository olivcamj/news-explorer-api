const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middleware/rate-limit');
const { requestLogger, errorLogger } = require('./middleware/logger.js');
const routes = require('./routes');
const catchError = require('./middleware/catchError.js');
const { serverCrash } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { NODE_ENV, MONGO_URI } = process.env;

require('dotenv').config();

const app = express();

app.use(requestLogger); // enabling the request logger

// applying the rate-limiter
app.use(limiter);

mongoose.connect((NODE_ENV === 'production' ? MONGO_URI : 'mongodb://127.0.0.1:27017/local'));
app.use(helmet());

app.use(express.json());

app.use(cors());
app.options('*', cors()); // preflight

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(serverCrash);
  }, 0);
});

app.use(routes);

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use(catchError);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
