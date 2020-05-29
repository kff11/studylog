import React, {useState} from "react";

import {Head, SideBar} from "./components";

import clsx from 'clsx';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import * as PropTypes from "prop-types";


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
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), );

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
        })}>
            <Head onSidebarOpen={handleSidebarOpen}/>
            <SideBar
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