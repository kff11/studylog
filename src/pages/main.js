import React from "react";

import {TestContents} from "../components/index";
import {Diary, Mentoring, Profile, Write} from "./index";
import {_Drawer} from "../inc/index";

import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import {Switch, Route} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Main = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <_Drawer/>
            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    <Route exact path='/' component={TestContents}></Route>
                    <Route path='/diary' component={Diary}></Route>
                    <Route path='/write' component={Write}></Route>
                    <Route path='/mentoring' component={Mentoring}></Route>
                    <Route path='/profile' component={Profile}></Route>
                </Switch>
            </main>
        </div>
    );
}
export default Main;