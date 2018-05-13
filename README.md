# hellomouse-quote-db

A website for IRC quotes. Currently WIP.

## Setup Postgres

This app expects a postgres server to be running. DB Config can be set in config.js
```javascript
db: {
    user: 'quote-db',
    host: 'localhost',
    database: 'quote-db',
    password: 'password',
    port: 3211
}
```
**Note:** You shouldn't store your password in plaintext if there is risk of it being leaked!

Here is the table format we used
```sql
CREATE TABLE quotes (
    id SERIAL,
    channel TEXT(25) NOT NULL,
    poster TEXT(16) NOT NULL,
    content TEXT(10000) NOT NULL,
    created_on TIMESTAMP NOT NULL
);
```

Before adding a new quote to the table, the server does the following checks:
* Channel text must be ASCII and start with a '#'
* Username must be ASCII

These checks are defined in `routes/quote.js`


## Install

```git clone https://github.com/Bowserinator/https://github.com/hellomouse/hellomouse-quote-db
cd hellomouse-quote-db
npm install
node index.js
```
