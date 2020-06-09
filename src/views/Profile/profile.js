import React, {useEffect, useState} from "react";

import {ProfileAccountItem, ProfileDetailsItem} from "./components";

import {makeStyles} from '@material-ui/core/styles';
import {useCookies} from "react-cookie";
import jwt from "jsonwebtoken";
import jwtKey from "../../config/jwt";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },

}));

const Profile = () => {
    const classes = useStyles();

    const [cookies] = useCookies('user');
    const [name, setName] = useState();
    const [mento, setMento] = useState('');

    const decoded = jwt.decode(cookies.user, jwtKey.secret);

    useEffect(() => {
        setName(decoded.name);
        setMento(decoded.mento);
    }, [decoded])

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={4}
                    xs={12}
                >
                    <ProfileAccountItem
                        name={name}
                        mento={mento}
                    />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <ProfileDetailsItem
                        _name={name}
                        _mento={mento}
                        _email={''}
                        _phone={''}
                        _state={'서울'}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default Profile;