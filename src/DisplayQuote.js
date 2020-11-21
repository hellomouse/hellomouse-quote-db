import React, { Component } from 'react';

import Quote from './Quote.js';

import 'material-components-web/dist/material-components-web.min.css';
import './css/App.css';
import { Button, Fab, Icon } from 'react-mdc-web/lib';

/** Component to display quotes */
class DisplayQuote extends Component {
    state = { quotes: [] };

    /**
     * Returns page or quote number
     * @return {object<string, string | number>}
     */
    getNumber() {
      let suffix = document.location.href.split('/');

      suffix = suffix[suffix.length - 1];

      /* Possible suffix list:
         * page_n - The nth page, starting from page 1
         * quote_n - Quote with id n, starting from quote 1 */
      if (suffix.startsWith('page_')) {
        let n = suffix.split('page_')[1];

        n = isNaN(n) ? 1 : +n;

        return {
          suffix: 'page_',
          value: n
        };
      } else if (suffix.startsWith('quote_')) {
        let n = suffix.split('quote_')[1];

        n = isNaN(n) ? 1 : +n;

        return {
          suffix: 'quote_',
          value: n
        };
      }
    }

    /** Function that runs when the component is mounted */
    componentDidMount() {
      let data = this.getNumber();

      this.is_single_quote = true;
      this.currentPage = -1;

      /* Possible suffix list:
         * page_n - The nth page, starting from page 1
         * quote_n - Quote with id n, starting from quote 1 */
      if (data.suffix.startsWith('page_')) {
        let n = data.value;

        this.is_single_quote = false;
        this.currentPage = n;

        fetch('/get_quote_page/' + n)
          .then(res => res.json())
          .then(quotes => this.setState({ quotes }));

        // Get total quotes in DB
        fetch('/num_pages/')
          .then(res => res.json())
          .then(res => {
            this.total_quotes = res.count;
            this.last_page = res.last_page;
          });
      } else if (data.suffix.startsWith('quote_')) {
        let n = data.value;

        // Blame the way the state is setup
        fetch('/get_quote/' + n)
          .then(res => res.json())
          .then(quote => this.setState({ quotes: { quotes: [quote] } }) );
      }
    }

    /**
     * @return {React.ReactElement}
     */
    render() {
      let currentPage = this.getNumber().value;
      let prevPage = currentPage - 1;
      let nextPage = currentPage + 1;

      prevPage = prevPage <= 0 ? '' : prevPage;

      return (
        <div>
          {this.state.quotes.quotes ? this.state.quotes.quotes.map(quote =>
            <Quote id={quote.id} poster={quote.poster} content={quote.content}
              channel={quote.channel} timestamp={quote.created_on} />
          ) : ''}

          {!this.is_single_quote ? (
            <span>
              <Button dense onClick={() => {
                window.location.href = '/page_1';
              }}>⮜</Button>
              <Button dense onClick={() => {
                window.location.href = '/page_' + prevPage;
              }}>{prevPage}</Button>
              <Button dense onClick={() => {
                window.location.href = '/page_' + currentPage;
              }}>{currentPage}</Button>
              <Button dense onClick={() => {
                window.location.href = '/page_' + nextPage;
              }}>{nextPage}</Button>
              <Button dense onClick={() => {
                window.location.href = '/page_' + this.last_page;
              }}>⮞</Button>
            </span>
          ) : ''}

          <Fab style={{ position: 'fixed' }} onClick={() => {
            window.location.href = '/add_quote';
          }}><Icon name='create'/></Fab>
        </div>
      );
    }
}

export default DisplayQuote;
