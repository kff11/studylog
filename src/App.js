import React from 'react';

import './App.css';
import {Login, Main} from './pages/index';
import {Head} from "./inc/index";

const App = () => {


    return (
        sessionStorage.getItem('login') ?
            <div>
                <div>
                    <Head/>
                </div>
                <div>
                    <Main/>
                </div>
            </div>
            :
            <Login/>
    )
        ;
}

export default App;
