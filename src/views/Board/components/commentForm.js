import React from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: 16,
        display: 'flex',
        width: '100%',
    },
    textField: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
    },
}));

const CommentTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#61380B',
        },
        '&:hover fieldset': {
            bordercolor: '#c48f65',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#c48f65'
        },
    },

})(TextField);

const WriteButton = withStyles({
    root: {
        backgroundColor: '#c48f65',
        '&:hover': {

            backgroundColor: '#996017'
        },
    }
})(Button);

const CommentForm = ({value, onChange, onCreate, avatar, onKeyPress}) => {
    const classes = useStyles();

    return (
        <div>
            <Divider/>
            <div className={classes.form}>
                <Avatar alt="user" src={avatar}/>
                <CommentTextField className={classes.textField}
                       value={value}
                       inputProps={{'aria-label': 'description'}}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                />
                <WriteButton size="small" variant="contained" color="primary"
                        onClick={onCreate}>
                    ok
                </WriteButton>
            </div>
        </div>
    );
}

export default CommentForm;