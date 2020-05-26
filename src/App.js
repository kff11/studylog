import React, {useState, useEffect} from 'react';

import './App.css';
import {Login} from './views';
import {Head} from "./layouts/components";
import {Redirect} from "react-router-dom";
import {useCookies} from "react-cookie";
import Main from "./layouts";

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
            <div className='background-main'>
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
