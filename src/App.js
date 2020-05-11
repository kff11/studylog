import React from 'react';

import './App.css';
import {Login, Home, Diary, Write} from './pages/index';
import {Switch, Route} from "react-router-dom";

const App = () => {

    return (
        <div>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/diary' component={Diary}></Route>
                <Route path='/write' component={Write}></Route>
            </Switch>
        </div>
    );
}

export default App;
