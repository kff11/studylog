import React, {useState, useEffect} from 'react';

import './App.css';
import {Login, Main} from './pages/index';
import {Head} from "./inc/index";
import {Redirect} from "react-router-dom";
import {useCookies} from "react-cookie";

const App = () => {

    const [cookies, setCookies] = useCookies(['user']);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (cookies.user && cookies.user !== 'undefined') {
            setLogged(true);
        }
    }, [cookies])


    return (
        logged ?
            <div>
                <div>
                    <Head handleLogout={() => {
                        setCookies('user');
                        setLogged(false);
                    }}/>
                </div>
                <div>
                    <Main logged={logged}/>
                </div>
            </div>
            :
            <div>
                <Redirect to='/login'/>
                <Login/>
            </div>
    )
        ;
}

export default App;
