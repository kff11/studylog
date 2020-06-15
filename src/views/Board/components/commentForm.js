import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import {AvatarPic} from "../../../images";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop : 16,
        display: 'flex',
        width: '100%',
        },
    textField : {
        marginLeft : 10,
        marginRight : 10,
        flex : 1,
    },
}));


const CommentForm = ()=> {
    const classes = useStyles();

    return(
        <div>
            <Divider />
            <form action="#" className={classes.form}>
                <Avatar alt="user" src={AvatarPic} />
                <Input className={classes.textField} defaultValue="Hello world" inputProps={{ 'aria-label': 'description' }} />
                <Button size="small" variant="contained" color="primary">
                    ok
                </Button>
            </form>
        </div>
    );
}

export default CommentForm;