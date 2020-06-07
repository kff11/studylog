import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from "react-cookie";

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        color: '#000',
        fontFamily: 'KopubWorldDotumMedium'
    },
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    }
});

const style = {
    fontcolor: '#000',
    fontFamily: 'KopubWorldDotumBold'
}

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div style={style}>
                        <App/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
