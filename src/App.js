import React from 'react';

import './App.css';
import {Login, Home} from './pages/index';
import {Switch, Route} from "react-router-dom";
//g

// 인냥

const App = () => {

    return (
        <div>
            <Switch>
              <Route exact path="/" component={Login}></Route>
              <Route path="/home" component={Home}></Route>
            </Switch>
        </div>
    );
}

export default App;
