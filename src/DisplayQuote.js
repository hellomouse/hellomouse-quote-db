import React, { Component } from 'react';

import Quote from './Quote.js';

import { Fab, Pagination } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

/** Component to display quotes */
class DisplayQuote extends Component {
    state = { quotes: { quotes: [] }, id: 1, last_page: 1, total_quotes: 1 };

    /**
     * Constructor
     * @param {RouteComponentProps} props
     */
    constructor(props) {
      super();
      this.state = { ...this.state, id: props.match.params.rID || 1 };
      this.isSingleQuote = true;
    }

    /** Function that runs when the component is mounted */
    componentWillMount() {
      let suffix = document.location.pathname.split('/').slice(-1)[0];

      /* Possible suffix list:
         * page_n - The nth page, starting from page 1
         * quote_n - Quote with id n, starting from quote 1 */
      if (suffix.startsWith('page_') || suffix === '') {
        this.isSingleQuote = false;
        fetch('https://hellomouse.net/api/quotes/get_quote_page/' + this.state.id)
          .then(res => res.json())
          .then(quotes => this.setState({ ...this.state, quotes }));

        // Get total quotes in DB
        fetch('https://hellomouse.net/api/quotes/num_pages/')
          .then(res => res.json())
          .then(res => {
            this.setState({ ...this.state, lastPage: res.last_page, totalQuotes: res.count });
          });
      } else if (suffix.startsWith('quote_')) {
        // Blame the way the state is setup
        fetch('https://hellomouse.net/api/quotes/get_quote/' + this.state.id)
          .then(res => res.json())
          .then(quote => this.setState({ ...this.state, quotes: { quotes: [quote] } }) );
      }
    }


    /**
     * @return {React.ReactElement}
     */
    render() {
      let currentPage = this.state.id;
      let lastPage = this.state.lastPage;

      return (
        <div>
          {this.state.quotes.quotes ? this.state.quotes.quotes.map(quote =>
            <Quote id={quote.id} poster={quote.poster} content={quote.content}
              channel={quote.channel} timestamp={quote.created_on} />
          ) : ''}

          {!this.isSingleQuote ? (
            <span>
              <Pagination color="primary" shape="rounded" showFirstButton showLastButton count={lastPage} page={currentPage}
                onChange={
                  (event, value) => {
                    this.setState({ ...this.state, id: value });
                    this.props.history.push(value);
                  }
                } />
            </span>
          ) : ''}

          <Link to="/add_quote">
            <Fab color="secondary" style={{ position: 'fixed' }} className={'fab'}>
              <CreateIcon />
            </Fab>
          </Link>
        </div>
      );
    }
}

export default withRouter(DisplayQuote);
