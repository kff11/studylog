import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Menu, Toolbar, Typography, IconButton, MenuItem, Hidden} from "@material-ui/core";
import {AccountCircle, Menu as MenuIcon} from "@material-ui/icons";

import {Link, useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
import jwt from "jsonwebtoken";
import jwtKey from "../../config/jwt";
import clsx from "clsx";
import * as PropTypes from "prop-types";

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

    const history = useHistory();

    const [cookies, setCookies] = useCookies('user');
    const [name, setName] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const decoded = jwt.decode(cookies.user, jwtKey.secret);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setCookies('user');
        window.location.reload();
        handleMenuClose();
    }

    const redirectProfile = () => {
        history.push('/profile');
        handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';

    useEffect(() => {
        setName(decoded.name)
    }, [decoded])

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={redirectProfile}>내 정보</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>

        </Menu>
    );

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
                        <IconButton onClick={handleProfileMenuOpen}
                                    color="inherit">
                            <AccountCircle/>
                        </IconButton>
                    </Hidden>
                    <Hidden lgUp>
                        <IconButton onClick={handleProfileMenuOpen}
                                    color="inherit">
                            <AccountCircle/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={onSidebarOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

Head.propTypes = {
    onSidebarOpen: PropTypes.func
};

export default Head;