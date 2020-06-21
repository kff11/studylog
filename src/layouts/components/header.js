import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, IconButton, Hidden} from "@material-ui/core";
import {Menu as MenuIcon, Input, Notifications} from "@material-ui/icons";

import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import '../../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#c48f65'
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
    icon: {
        color: '#61380B',
        marginLeft: theme.spacing(1)
    },
    link: {
        color: '#61380B',
        textDecoration: 'none',
    },
    iconlink: {
        color: 'inherit',
        textDecoration: 'none',
    },
    title: {
        fontFamily: 'aSpace'
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
                        <Typography className={classes.title} variant="h5" noWrap>
                            StudyLog
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
                                <Notifications className={classes.icon}/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            className={classes.icon}
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
                            <MenuIcon className={classes.icon}/>
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