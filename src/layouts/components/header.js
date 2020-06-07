import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, IconButton, MenuItem, Hidden} from "@material-ui/core";
import {Menu as MenuIcon, Input, Notifications} from "@material-ui/icons";

import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none'
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    link: {
        color: '#FFF',
        textDecoration: 'none',
    },
    iconlink: {
        color: 'inherit',
        textDecoration: 'none',
    },
}));


const Head = props => {
    const {onSidebarOpen} = props;

    const classes = useStyles();

    const [cookies, setCookies] = useCookies('user');
    const [notifications, setNotifications] = useState([]);

    const handleLogout = () => {
        // 토큰 비우기
        setCookies('user');
        setCookies('userRefreshToken');

        window.location.reload();
    }

    return (
        <div>
            <AppBar className={classes.root}>
                <Toolbar>
                    <Link className={classes.link} to='/'>
                        <Typography variant="h6" noWrap>
                            스터디로그
                        </Typography>
                    </Link>
                    <div className={classes.grow}/>
                    <Hidden mdDown>
                        <IconButton color="inherit">
                            <Badge
                                badgeContent={notifications.length}
                                color="primary"
                                variant="dot"
                            >
                                <Notifications/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            className={classes.signOutButton}
                            color="inherit"
                            onClick={handleLogout}
                        >
                            <Input/>
                        </IconButton>
                    </Hidden>
                    <Hidden lgUp>
                        <IconButton
                            color="inherit"
                            onClick={onSidebarOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Head.propTypes = {
    onSidebarOpen: PropTypes.func
};

export default Head;