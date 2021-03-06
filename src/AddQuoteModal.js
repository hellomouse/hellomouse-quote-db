import React, { Component } from 'react';

import './css/AddQuoteModal.css';
import { Button, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

/** */
class AddQuoteModal extends Component {
    state = {
      username: '',
      channel: '',
      quote: '',
      error_msg: '',
      success_msg: ''
    };

    addQuote() {
      fetch('/add_quote/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          poster: this.state.username,
          channel: this.state.channel,
          content: this.state.quote
        })
      }).then(res => res.json())
        .then(res => {
          if (!res.success) {
            this.setState({ error_msg: res.message });
          } else {
            this.setState({ success_msg: res.message });

            setTimeout(() => {
              window.history.back();
            }, 1000);
          }
        });
    }

    /**
     * @return {React.ReactElement}
     */
    render() {
      return (
        <div className="modal">
          <div style={{ height: '80px' }}></div>

          {this.state.error_msg ? (
            <div className='error'><b>Error: </b>{this.state.error_msg}</div>
          ) : ''}

          {this.state.success_msg ? (
            <div className='success'><b>Success: </b>{this.state.success_msg}</div>
          ) : ''}

          <TextField
            label="IRC Username"
            required
            value={this.state.username}
            onChange={({ target: { value: username } }) => {
              this.setState({ username });
            }}
            style={{
              width: '220px',
              marginRight: '10px'
            }}
          />

          <TextField
            label="Channel"
            required
            value={this.state.channel}
            onChange={({ target: { value: channel } }) => {
              this.setState({ channel });
            }}
            style={{ width: '220px' }}
          />

          <br/><br/>
          <textarea
            required
            rows="15"
            cols="50"
            value={this.state.quote}
            onChange={({ target: { value: quote } }) => {
              this.setState({ quote });
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

          <Button onClick={this.props.history.goBack}>CANCEL</Button>
          <Button onClick={this.addQuote}>ADD QUOTE</Button>

        </div>
      );
    }
}

export default withRouter(AddQuoteModal);
