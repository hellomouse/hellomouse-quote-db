

/* Useage:
 * node index.js */
process.title = 'hellomouse-quote-db';


/* Requires */
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');

const config = require('./config.js');
const quoteRoute = require('./routes/quote.js');

/* Server and app */
const app = express();

app.use(bodyParser.json({ limit: '4mb' }));
app.use(quoteRoute);

let limiter = new RateLimit({
  windowMs: 2 * 60 * 1000,
  max: 15,
  delayMs: 0
});

app.post('*', limiter);

app.listen(config.port, function() {
  winston.info(`Example app listening on port ${config.port}`);
});
