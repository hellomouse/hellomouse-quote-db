'use strict';

const db = require('../db/index.js');
const config = require('../config.js');
const query = `INSERT INTO ${config.db.table_name}(channel, poster, content, created_on)
VALUES ($1, $2, $3, $4) RETURNING *`;

/**
 * addQuote - Add a new quote to the database. May
 * throw an error if insertion failed/
 *
 * @param  {string} channel Channel name
 * @param  {string} poster  Person who posted the quote
 * @param  {string} content The quote itself
 */
function addQuote(channel, poster, content){
    db.query(query, [channel, poster, content, new Date()], err => {
        if (err) throw err;
    });
}

module.exports = addQuote;
