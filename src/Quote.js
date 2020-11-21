import React, { Component } from 'react';
import './css/Quote.css';

const formatDate = require('format-date');


/** */
class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: this.props.poster,
      content: this.props.content,
      timestamp: this.props.timestamp,
      id: this.props.id,
      channel: this.props.channel
    };
  }

  /**
   * @return {React.ReactElement}
   */
  render() {
    return (
      <div className='quote'>
        {/* Top section of the quote, contains all
                  * the quote information */}
        <div className='top-sec'>
          <small>
            <b className='number'>{(this.state.id + '').padStart(5, '0')}</b> &nbsp;
            {this.state.poster} in {this.state.channel}

            <span className='light right'>
              {formatDate('{month-name} {day}, {year} {hours}:{minutes}:{seconds}', new Date(this.state.timestamp))}
                            &nbsp; &nbsp;
              <a href={'/quote_' + this.state.id }>Permalink</a>
            </span>
            <br></br>
          </small>
        </div>

        {/* The actual quote */}
        <pre>
          {this.state.content}
        </pre>
      </div>
    );
  }
}

export default Quote;
