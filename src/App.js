import React, { Component } from 'react';

import Quote from './Quote.js';
import AddQuoteModal from './AddQuoteModal.js';
import DisplayQuote from './DisplayQuote.js';

import 'material-components-web/dist/material-components-web.min.css';
import './css/App.css';
import {Toolbar, ToolbarRow, ToolbarTitle, ToolbarSection} from 'react-mdc-web/lib';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbar fixed style={{ backgroundColor: '#333' }}>
                    <ToolbarRow>
                        <ToolbarSection align="start">
                            <ToolbarTitle>
                                	💬 Hellomouse Quote DB
                            </ToolbarTitle>
                        </ToolbarSection>
                    </ToolbarRow>
                </Toolbar>

                {document.location.href.includes('/add_quote') ? (
                    <AddQuoteModal></AddQuoteModal>
                ) : (
                    <div>
                        <div style={{ height: '50px' }}></div>
                        <DisplayQuote></DisplayQuote>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
