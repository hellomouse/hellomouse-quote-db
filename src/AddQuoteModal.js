import React, { Component } from 'react';

import 'material-components-web/dist/material-components-web.min.css';
import './css/AddQuoteModal.css';
import {Button, Textfield} from 'react-mdc-web/lib';


class AddQuoteModal extends Component {
    constructor (props){
        super(props);

        this.state = {
            username: '',
            channel: '',
            quote: '',
            error_msg: ''
        };

        this.addQuote = this.addQuote.bind(this);
    }

    addQuote() {
        fetch('/add_quote/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                poster: this.state.username,
                channel: this.state.channel,
                content: this.state.quote
            })
        }).then(res => res.json())
          .then(res => {
            if (!res.success) {
                let curr_state = this.state;
                curr_state.error_msg = res.message;
                this.setState(curr_state);
            }
        });
    }

    render() {
        return (
            <div className="modal">
                <div style={{ height: '80px' }}></div>

                {this.state.error_msg ? (
                    <div className='error'><b>Error: </b>{this.state.error_msg}</div>
                ) : ''}

                <Textfield
                    floatingLabel="IRC Username"
                    required
                    value={this.state.username}
                    onChange={({ target : {value : username}}) => {
                        this.setState({ username })
                    }}
                    style={{
                        width: '220px',
                        marginRight: '10px'
                    }}
                />

                <Textfield
                    floatingLabel="Channel"
                    required
                    value={this.state.channel}
                    onChange={({ target : {value : channel}}) => {
                        this.setState({ channel })
                    }}
                    style={{ width: '220px' }}
                />

                <br/><br/>
                <textarea
                    required
                    rows="15"
                    cols="50"
                    value={this.state.quote}
                    onChange={({target : {value : quote}}) => {
                        this.setState({ quote })
                    }}
                    className="add-quote-textarea"
                />

                <br/><br/>

                <div>
                    <small>
                    Be nice and don't spam. Remove timestamps, laughter,
                    interruptions, parts/joins, and<br/> other things which
                    aren't required for the quote to be funny (do not actively improve it)
                    </small>
                </div>
                <br/>

                <Button onClick={() => {window.history.back()}}>CANCEL</Button>
                <Button onClick={this.addQuote}>ADD QUOTE</Button>

            </div>
        );
    }
}

export default AddQuoteModal;
