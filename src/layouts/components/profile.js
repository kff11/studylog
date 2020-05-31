import React from "react";
import {Link} from 'react-router-dom';
import * as PropTypes from "prop-types";
import {AvatarPic} from "../../images";
import {Avatar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    avatar: {
        width: 60,
        height: 60
    },
    name: {
        fontWeight: '550',
        marginTop: theme.spacing(1)
    }
}));

const ProfileNav = props => {
    const {name, mento} = props;

    const classes = useStyles();

    const user = {
        name: name,
        avatar: AvatarPic,
        mento: mento ? '멘토' : '학습자',
    }

    return (
        <div className={classes.root}>
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={Link}
                src={user.avatar}
                to="/profile"
            />
            <Typography
                className={classes.name}
                variant="h5"
            >
                {user.name}
            </Typography>
            <Typography variant="body2">{user.mento}</Typography>
        </div>
    );
}
ProfileNav.propTypes = {
    name: PropTypes.string,
}

export default ProfileNav;