import React from "react";
import {Drawer} from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InfoIcon from '@material-ui/icons/Info';
import {makeStyles} from "@material-ui/core/styles";

import {SideBarNav} from "./index";
import * as PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";


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
    const { open, variant, onClose} = props;

    const classes = useStyles();

    const pages = [
        {
            title: '일기장',
            href: '/diary',
            icon: <MenuBookIcon/>
        },
        {
            title: '멘토링',
            href: '/mentoring',
            icon: <SupervisedUserCircleIcon/>
        },
        {
            title: '게시판',
            href: '/board',
            icon: <AssignmentIcon/>
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
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div className={classes.root}>
                <Divider className={classes.divider} />
                <SideBarNav
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
    variant: PropTypes.string.isRequired
};

export default SideBar;