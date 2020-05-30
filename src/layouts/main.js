import React, {useEffect, useState} from "react";

import {Head, SideBar} from "./components";

import clsx from 'clsx';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import * as PropTypes from "prop-types";
import jwt from "jsonwebtoken";
import jwtKey from "../config/jwt";
import {useCookies} from "react-cookie";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    }
}));

const Main = props => {
    const classes = useStyles();

    const {children} = props;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const [cookies, setCookies] = useCookies('user');

    const [openSidebar, setOpenSidebar] = useState(false);
    const [name, setName] = useState('');

    const decoded = jwt.decode(cookies.user, jwtKey.secret);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    useEffect(() => {
        setName(decoded.name)
    }, [decoded])

    return (
        <div className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
        })}>
            <Head onSidebarOpen={handleSidebarOpen}/>
            <SideBar
                name={name}
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
        ;
}

Main.propTypes = {
    children: PropTypes.node
};
export default Main;