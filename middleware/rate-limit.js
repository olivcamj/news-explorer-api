const rateLimit = require('express-rate-limit');
const { reachedLimit } = require('../utils/constants');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // a maximum of 100 requests from one IP
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: async (req, res) => {
    res.status(429).json({ message: reachedLimit });
  },
});
