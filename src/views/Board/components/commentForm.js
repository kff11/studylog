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


const CommentForm = ( {value, onChange,onCreate,onKeyPress} )=> {
    const classes = useStyles();

    return(
        <div>
            <Divider />
            <div className={classes.form}>
                <Avatar alt="user" src={AvatarPic} />
                <Input className={classes.textField}
                       value={value}
                       inputProps={{ 'aria-label': 'description' }}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                />
                <Button size="small" variant="contained" color="primary"
                        onClick={onCreate}>
                    ok
                </Button>
            </div>
        </div>
    );
}

export default CommentForm;