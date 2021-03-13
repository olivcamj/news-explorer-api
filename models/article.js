const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, [
        {
          protocols: ['http', 'https', 'ftp'],
          require_tld: true,
          require_protocol: true,
        },
      ]),
      message: "The 'link' field must have a valid URL.",
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, [
        {
          protocols: ['http', 'https', 'ftp'],
          require_tld: true,
          require_protocol: true,
        },
      ]),
      message: "The 'link' field must have a valid URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.models('article', articleSchema);
