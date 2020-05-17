import React from 'react';

import './App.css';
import {Login, Main} from './pages/index';
import {Head} from "./inc/index";
import {Redirect} from "react-router-dom";

const App = () => {
    const [logged, setLogged] = React.useState(false);

    if(!logged) {

    }
    const token = document.cookie.user;
    //console.log(document.cookie.);

    return (
        logged ?
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
                <Redirect to='/login'/>
                <Login setLogged={setLogged} />
            </div>
    )
        ;
}

export default App;
