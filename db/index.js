

const { Client } = require('pg');
const config = require('../config.js');

/* Setup the postgres client */
const client = new Client({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

client.connect();

/* In theory we should be logging queries
 * in some way as a security measure, but
 * that shouldn't be necessary for now
 *
 * TODO add query logging, and limit direct
 * client access */
module.exports = client;
