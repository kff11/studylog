import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Main as MainLayout} from './layouts';
import {RouteWithLayout, TestContents} from './components';

import {
    Diary as DiaryView,
    Mentoring as MentoringView,
    Profile as ProfileView,
    About as AboutView,
    Login as LoginView,
    Board as BoardView,

} from './views'


const Routes = props => {
    const {logged} = props;

    return (
        <Switch>
            <RouteWithLayout
                exact
                component={TestContents}
                layout={MainLayout}
                path='/'
            />
            <RouteWithLayout
                exact
                component={DiaryView}
                layout={MainLayout}
                path='/diary'
            />
            <RouteWithLayout
                exact
                component={MentoringView}
                layout={MainLayout}
                path='/mentoring'
            />
            <RouteWithLayout
                exact
                component={BoardView}
                layout={MainLayout}
                path='/board'
            />
            <RouteWithLayout
                exact
                component={ProfileView}
                layout={MainLayout}
                path='/profile'
            />
            <RouteWithLayout
                exact
                component={AboutView}
                layout={MainLayout}
                path='/about'
            />
            <Route
                exact
                component={() => <LoginView logged={logged}/>}
                path='/login'
            />
        </Switch>
    )
}

export default Routes;