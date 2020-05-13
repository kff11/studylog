import React from 'react';

import './App.css';
import {Login, Main} from './pages/index';
import {Head} from "./inc/index";
import {Redirect} from "react-router-dom";

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
            <div>
                <Redirect to='/'/>
                <Login/>
            </div>
    )
        ;
}

export default App;
