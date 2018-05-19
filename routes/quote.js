'use strict';

const express = require('express');
const addQuote = require('../src/add-quote.js');
const db = require('../db/index.js');
const config = require('../config.js');

let router = express.Router();


router.post('/add_quote', async function(req, res) {

});

router.get('/get_quote/*', function(req, res) {
    /* Returns a JSON object representing the
     * quote object. For example
     *
     * { poster: <>, content: <>, timestamp: <>, channel: <> }
     *
     * To get a quote by id, do
     * /get_quote/<id> */
    let id = req.url.split('/');
    id = id[id.length - 1];

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

router.get('/get_quote_page/*', function(req, res) {
    /* Returns a JSON object representing the
     * quotes. For example
     *
     * { quotes: [{ poster: <>, content: <>, timestamp: <>, channel: <> }, ...] }
     *
     * To get quotes for a page, do
     * /get_quote/page */
    let page = req.url.split('/');
    page = +page[page.length - 1] - 1;

    let start_id = page * config.quotes_per_page + 1;
    let end_id = config.quotes_per_page * (page + 1) + 1;

    let query = `SELECT * FROM ${config.db.table_name} where id >= ${start_id} and id < ${end_id}`;

    db.query(query, (err, db_res) => {
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
