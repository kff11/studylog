import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";

import {Link, useHistory} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useCookies} from "react-cookie";
import jwt from "jsonwebtoken";
import jwtKey from "../../config/jwt";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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


const Head = ({handleLogout}) => {
    const classes = useStyles();

    const history = useHistory();

    const [cookies] = useCookies('user');
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
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Link className={classes.link} to='/'>
                        <Typography variant="h6" noWrap>
                            스터디로그
                        </Typography>
                    </Link>
                    <div className={classes.grow}/>
                    <Link className={classes.link} onClick={handleProfileMenuOpen}>
                        <IconButton
                            color="inherit">
                            <AccountCircle/>
                        </IconButton>
                        {name}
                    </Link>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

export default Head;