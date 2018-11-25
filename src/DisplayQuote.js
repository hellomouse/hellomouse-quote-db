import React, { Component } from 'react';

import Quote from './Quote.js';

import 'material-components-web/dist/material-components-web.min.css';
import './css/App.css';
import {Button, Fab, Icon} from 'react-mdc-web/lib';


class DisplayQuote extends Component {
    state = { quotes: [] };

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

    componentDidMount() {
        let data = this.getNumber();

        this.is_single_quote = true;
        this.current_page = -1;

        /* Possible suffix list:
         * page_n - The nth page, starting from page 1
         * quote_n - Quote with id n, starting from quote 1 */
        if (data.suffix.startsWith('page_')) {
            let n = data.value;

            this.is_single_quote = false;
            this.current_page = n;

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
                .then(quote => this.setState({ quotes: { quotes: [quote] }}) );
        }
    }

    render() {
        let current_page = this.getNumber().value;
        let prev_page = current_page - 1;
        let next_page = current_page + 1;

        prev_page = prev_page <= 0 ? '' : prev_page;

        return (
            <div>
                {this.state.quotes.quotes ? this.state.quotes.quotes.map(quote =>
                    <Quote id={quote.id} poster={quote.poster} content={quote.content} channel={quote.channel} timestamp={quote.created_on} />
                ) : ''}

                {!this.is_single_quote ? (
                    <span>
                        <Button dense onClick={() => {window.location.href = '/page_1'}}>⮜</Button>
                        <Button dense onClick={() => {window.location.href = '/page_' + prev_page}}>{prev_page}</Button>
                        <Button dense onClick={() => {window.location.href = '/page_' + current_page}}>{current_page}</Button>
                        <Button dense onClick={() => {window.location.href = '/page_' + next_page}}>{next_page}</Button>
                        <Button dense onClick={() => {window.location.href = '/page_' + this.last_page}}>⮞</Button>
                    </span>
                ) : ''}

                <Fab style={{ position: 'fixed' }} onClick={() => {window.location.href = '/add_quote'}}><Icon name='create'/></Fab>
            </div>
        );
    }
}

export default DisplayQuote;
