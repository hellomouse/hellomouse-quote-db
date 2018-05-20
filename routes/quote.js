'use strict';

const isAscii = require('is-ascii');
const express = require('express');
const addQuote = require('../src/add-quote.js');
const db = require('../db/index.js');
const config = require('../config.js');

let router = express.Router();


/**
 * returnJSONResponse - description
 *
 * @param  {Response} res     Res object, as given by the callback
 * @param  {string} message   Message to send
 * @param  {boolean} success  Did the request work?
 */
function returnJSONResponse(res, message, success) {
    res.json({
        success: success,
        message: message
    });
    res.end();
}


router.post('/add_quote/', async function(req, res) {
    try {
        if (!req.body.channel || !isAscii(req.body.channel) || !req.body.channel.startsWith('#')) {
            returnJSONResponse(res, "Channel name must be ASCII and start with '#'", false);
        } else if (req.body.channel.length > 25) {
            returnJSONResponse(res, 'Channel name cannot be larger than 25 characters', false);
        } else if (!req.body.poster || !isAscii(req.body.poster)) {
            returnJSONResponse(res, 'Username must be ASCII', false);
        } else if (req.body.poster.length > 16) {
            returnJSONResponse(res, 'Username must be of length 16 or less', false);
        } else if (!req.body.content) {
            returnJSONResponse(res, 'You must provide a quote', false);
        } else if (req.body.content.length > 10000) {
            returnJSONResponse(res, 'Quote must be less than 10000 characters', false);
        } else {
            await addQuote(req.body.channel, req.body.poster, req.body.content);
            returnJSONResponse(res, 'Quote posted!', true);
        }
    } catch(e) {
        returnJSONResponse(res, 'An error occured while posting the quote', false);
    }
});

router.get('/get_quote/:id', function(req, res) {
    /* Returns a JSON object representing the
     * quote object. For example
     *
     * { poster: <>, content: <>, timestamp: <>, channel: <> }
     *
     * To get a quote by id, do
     * /get_quote/<id> */
    let id = req.params.id;

    /* Only allow numbers */
    if (isNaN(id)) {
        res.json({ success: false });
        return;
    }

    let query = `SELECT * FROM ${config.db.table_name} where id = '${id}'`;

    db.query(query, (err, db_res) => {
        if (err || db_res.rows.length === 0) {
            res.json({ success: false });
        } else {
            db_res = db_res.rows[0];
            db_res.success = true;
            res.json(db_res);
        }
    });
});

router.get('/get_quote_page/:page', function(req, res) {
    /* Returns a JSON object representing the
     * quotes. For example
     *
     * { quotes: [{ poster: <>, content: <>, timestamp: <>, channel: <> }, ...] }
     *
     * To get quotes for a page, do
     * /get_quote/page */
    let page = req.params.page;
    let start_id = page * config.quotes_per_page + 1;
    let end_id = config.quotes_per_page * (page + 1) + 1;

    let query = `SELECT * FROM ${config.db.table_name} where id >= $1 and id < $2`;

    db.query(query, [start_id, end_id], (err, db_res) => {
        if (err || db_res.rows.length === 0) {
            res.json({ success: false });
        } else {
            db_res = { quotes: db_res.rows };
            db_res.success = true;
            res.json(db_res);
        }
    });
});

router.get('/num_pages/*', function(req, res) {
    db.query(`SELECT count(*) AS exact_count FROM ${config.db.table_name};`, (err, db_res) => {
        if (err || db_res.rows.length === 0) {
            res.json({
                success: false,
                count: 0,
                last_page: 1
            });
        } else {
            res.json({
                success: true,
                count: db_res.rows[0].exact_count,
                last_page: 1 + Math.floor(db_res.rows[0].exact_count / config.quotes_per_page)
            });
        }
    });
});

module.exports = router;
