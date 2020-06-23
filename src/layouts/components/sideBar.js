import React from "react";
import {Drawer, Divider} from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InfoIcon from '@material-ui/icons/Info';
import {makeStyles} from "@material-ui/core/styles";

import {SideBarNav, ProfileNav} from "./";
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    },
    link: {
        color: '#000',
        textDecoration: 'none',
    },
}));

const SideBar = props => {
    const {open, variant, onClose, name, mento, avatar} = props;

    const classes = useStyles();

    const pages = [
        {
            title: '일기장',
            href: '/diary',
            icon: <MenuBookIcon/>
        },
        {
            title: '공유 게시판',
            href: '/board',
            icon: <AssignmentIcon/>
        },
        {
            title: '멘토링',
            href: '/mentoring',
            icon: <SupervisedUserCircleIcon/>
        },
        {
            title: 'About',
            href: '/about',
            icon: <InfoIcon/>
        },
    ];

    return (
        <Drawer
            anchor="left"
            classes={{paper: classes.drawer}}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div className={classes.root}>
                <ProfileNav
                    name={name}
                    mento={mento}
                    avatar={avatar}
                    onClose={onClose}
                />
                <Divider className={classes.divider}/>
                <SideBarNav
                    onClose={onClose}
                    className={classes.nav}
                    pages={pages}
                />
            </div>
        </Drawer>
    );
}

SideBar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    name: PropTypes.string,
    mento: PropTypes.bool,
    avatar: PropTypes.string,
};

export default SideBar;