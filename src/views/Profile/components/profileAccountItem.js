import React, {useEffect} from "react";

import jwt from "jsonwebtoken";
import jwtKey from "../../../config/jwt";
import {useCookies} from "react-cookie";

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {loginPic} from '../../../images';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
    },
    link: {
        color: '#CCC',
        textDecoration: 'none',
    },
}));

const ProfileAccountItem = () => {
    const classes = useStyles();

    const [cookies] = useCookies('user');
    const [name, setName] = React.useState();

    const decoded = jwt.decode(cookies.user, jwtKey.secret);

    useEffect(() => {
        setName(decoded.name)
    }, [decoded])


    return (
        <Paper className={classes.paper}>
            <Avatar src={loginPic}/>
            <Typography variant="h6">
                <b>내 정보</b>
            </Typography>
            <br/>
            이름 : {name}
            <br/>
            <br/>
            <div align='right'>
                <Link className={classes.link} to='/profile/modify'>
                    수정하기
                </Link>

            </div>
        </Paper>
    )
}
export default ProfileAccountItem;