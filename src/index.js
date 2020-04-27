import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'KopubWorldDotumMedium'
    },
});

const style = {
    fontFamily: 'KopubWorldDotumMedium'
}

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <div style={style}>
                    <App/>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
