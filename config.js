'use strict';

const fs = require('fs');

module.exports = {
    http: {
        port: 8200
    },
    https: {
        port: 8001,
        cert: '<cert file path>',
        key: '<key file path>',
    },
    https_enabled: false,

    /* Postgres config */
    db: {
        user: 'quote-db',
        host: 'localhost',
        database: 'quote-db',
        table_name: 'quotes',
        password: fs.readFileSync('db-password.txt').toString('utf8'),
        port: 3211
    }
};
