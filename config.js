'use strict';

const fs = require('fs');

module.exports = {
    port: 8200,

    /* Postgres config */
    db: {
        user: 'quote-db',
        host: 'localhost',
        database: 'quote-db',
        table_name: 'quotes',
        password: fs.readFileSync('db-password.txt').toString('utf8'),
        port: 3211
    },

    quotes_per_page: 10
};
