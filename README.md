# hellomouse-quote-db

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/066360820bb843ab8cc97ccf47c5d2d4)](https://www.codacy.com/app/Bowserinator/hellomouse-quote-db?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hellomouse/hellomouse-quote-db&amp;utm_campaign=Badge_Grade)

![Example quote](https://i.imgur.com/QjBlwEX.png "Quote example")

A website for IRC quotes for hellmouse.


## Features
* Nice material design layout
* Fancy pagination
* You can add quotes

This app isn't meant to be fancy. There are currently no user accounts or auth required, so if you plan on using this beyond a private group, you should (at least) add a CAPTCHA or auth of some sort.

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
* Channel length must be 25 chars of less
* Username must be ASCII
* Username must be 16 chars or less
* Quote cannot exceed 10000 chars in length

These checks are defined in `routes/quote.js`

## Pages
```
<your server>:<react port>/page_n    Access nth page
<your server>:<react port>/quote_n   Access a specific quote by id

<your server>:<express port>/get_quote/n       Get info for nth quote
<your server>:<express port>/get_quote_page/n  Get quotes in nth page
<your server>:<express port>/num_pages/        Get number of pages

<your server>:<express port>/add_quote    Send a POST with a json payload:
     {
          poster: <whoever posted it>,
          channel: <channel, ie #test>,
          content: <quote content>
     }
```

## Install

```git clone https://github.com/Bowserinator/https://github.com/hellomouse/hellomouse-quote-db
cd hellomouse-quote-db
npm install
```
You will need to run both
```
node index.js
npm start
```
Also Postgres needs to be setup. Edit `config.js` for db connection options.

## Additional Config
In addition to the config you can change in `config.js`, you must also edit the following lines in package.json:
```json
"start": "PORT=8201 react-scripts start",
"proxy": "http://localhost:8200"
```
The port in the first line should be the port of the react app (Webpage), the port on the 2nd line should be the port of the express app (Same as the port defined in config.js)

## Contributing

Got something cool? Bug fixes? Open a PR!

## License
See LICENSE
