'use strict';

/* Useage:
 * node index.js */
process.title = 'hellomouse-quote-db';


/* Requires */
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const winston = require('winston');

const config = require('./config.js');


/* Server and app */
const app = express();

/* Try to create the HTTP server */
if( config.http ){
    let http_server = http.createServer(app);

    http_server.listen(config.http_port, function() {
        winston.log('HTTP Server Listening - http://localhost:' + config.http.port + '\n');
    });
}

/* Try to create the HTTPS server */
if (config.https_enabled) {
    let ssl_options = {
        key: fs.readFileSync(config.https.key),
        cert: fs.readFileSync(config.https.cert)
    };

    let https_server = https.createServer(ssl_options, app);

    https_server.listen(config.port, function() {
        winston.log('HTTPS Server Listening - http://localhost:' + config.https.port + '\n');
    });
}
