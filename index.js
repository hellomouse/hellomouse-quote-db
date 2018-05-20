'use strict';

/* Useage:
 * node index.js */
process.title = 'hellomouse-quote-db';


/* Requires */
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');

const config = require('./config.js');
const quote_route = require('./routes/quote.js');

/* Server and app */
const app = express();

app.use(bodyParser.json());
app.use(quote_route);


app.listen(config.port, function () {
    winston.log(`Example app listening on port ${config.port}`);
});
