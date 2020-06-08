import React from "react";

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        color: theme.palette.text.secondary,
    },
    link: {
        color: '#CCC',
        textDecoration: 'none',
    },
}));

const ProfileAccountItem = () => {
    const classes = useStyles();

    const [name, setName] = React.useState(sessionStorage.getItem('name'));


    return (
        <Paper elevation={2} className={classes.paper}>
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