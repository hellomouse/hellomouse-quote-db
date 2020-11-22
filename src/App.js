import React, { Component } from 'react';

import AddQuoteModal from './AddQuoteModal.js';
import DisplayQuote from './DisplayQuote.js';

import './css/App.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { BrowserRouter as Router, Route } from 'react-router-dom';


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

        <CssBaseline />

        <Router>
          <Route exact path='/' component={DisplayQuote} />
          <Route path={['/page_:rID', '/quote_:rID']} component={DisplayQuote} />
          <Route exact path='/add_quote' component={AddQuoteModal} />
        </Router>
      </div>
    );
  }
}

export default App;
