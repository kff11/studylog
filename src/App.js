import React, {useState, useEffect} from 'react';

import './App.css';
import {Login as LoginView} from './views';
import {Redirect, Route} from "react-router-dom";
import {useCookies} from "react-cookie";
import Routes from "./routes";

const App = () => {

    const [cookies] = useCookies(['user']);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (cookies.user && cookies.user !== 'undefined') {
            setLogged(true);
        }
    }, [cookies])


    return (
        logged ?
            <Routes logged={logged}/>
            :
            <div>
                <Redirect to='/login'/>
                <Route
                    exact
                    component={() => <LoginView logged={logged}/>}
                    path='/login'
                />
            </div>
    )
}

export default App;
