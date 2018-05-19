'use strict';

/* Useage:
 * node index.js */
process.title = 'hellomouse-quote-db';


/* Requires */
const express = require('express');
const fs = require('fs');
const winston = require('winston');

const config = require('./config.js');
const quote_route = require('./routes/quote.js');

/* Server and app */
const app = express();

app.use(quote_route);

app.get('/users', function(req, res, next) {

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});


app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}`);
});
