require('dotenv').config();

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

const { PORT = 3000, MONGO_URI } = process.env;


const app = express();

app.use(requestLogger); // enabling the request logger

// applying the rate-limiter
app.use(limiter);

const uri = MONGO_URI;
async function connectToDB() {
  if (!uri) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}
   try {
    await mongoose.connect(uri);
  } catch(e) {
     console.error('❌ Error connecting to MongoDB:', e);
  }
}
connectToDB();

const https = require("https");

app.get("/my-ip", (req, res) => {
  https.get("https://ifconfig.me/ip", (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    resp.on("end", () => {
      res.send(`Server outgoing IP: ${data}`);
    });
  }).on("error", (err) => {
    console.error("Error fetching IP:", err.message);
    res.status(500).send("Unable to fetch IP");
  });
});

app.use(helmet());

app.use(cors());

app.use(express.json());


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
