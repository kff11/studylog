import React from "react";

import {ProfileAccountItem} from "./components";

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const Profile = () => {
    const classes = useStyles();

    return (
        <div width='100'>

            <ProfileAccountItem/>

        </div>
    )
}
export default Profile;