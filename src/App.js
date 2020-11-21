import React, { Component } from 'react';

import AddQuoteModal from './AddQuoteModal.js';
import DisplayQuote from './DisplayQuote.js';

import './css/App.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';


/** */
class App extends Component {
  /**
   * @return {React.ReactElement}
   */
  render() {
    return (
      <div className="App">
        <AppBar position="static" style={{ background: '#333' }}>
          <Toolbar>
            <Typography variant="h6">
              <span role="img">💬</span> Hellomouse Quote DB
            </Typography>
          </Toolbar>
        </AppBar>

        {document.location.href.includes('/add_quote') ? (
          <AddQuoteModal></AddQuoteModal>
        ) : (
          <div>
            <div style={{ height: '70px' }}></div>
            <DisplayQuote></DisplayQuote>
          </div>
        )}
      </div>
    );
  }
}

export default App;
