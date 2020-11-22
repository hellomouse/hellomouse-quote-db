import React, { Component } from 'react';

import AddQuoteModal from './AddQuoteModal.js';
import DisplayQuote from './DisplayQuote.js';

import './css/App.css';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core';

import { BrowserRouter as Router, Route } from 'react-router-dom';


/** */
class App extends Component {
  /**
   * @return {React.ReactElement}
   */
  render() {
    return (
      <React.Fragment>
        <AppBar position="fixed" style={{ background: '#333' }}>
          <Toolbar>
            <Typography variant="h6">
              <span role="img">💬</span> Hellomouse Quote DB
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="App">
          <CssBaseline />

          <Router>
            <Container>
              <Box sx={{ mt: 10, mb: 4 }}>
                <Route exact path='/' component={DisplayQuote} />
                <Route path={['/page_:rID', '/quote_:rID']} component={DisplayQuote} />
                <Route exact path='/add_quote' component={AddQuoteModal} />
              </Box>
            </Container>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
