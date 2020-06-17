import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {Save, Share} from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Card, Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        minHeight: 500,
        minWidth: 300,
    },
    bottomMargin: {
        marginBottom: 30,
    },
    grow: {
        flexGrow: 1,
    },
    display: {
        marginTop: 20,
        display: 'flex',
    },
    button: {
        marginLeft: 12,
    },
}));

const DiaryTextField = withStyles({
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
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#61380B',
            },
            '&:hover fieldset': {
                bordercolor: '#c48f65',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#c48f65',
            },
        },
    },

})(TextField);

const ContentTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#61380B',
            },
            '&:hover fieldset': {
                bordercolor: '#c48f65',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#c48f65',
            },
        }
    }
})(TextField);

const WriteButton = withStyles({
    root: {
        backgroundColor: '#CFB095',
        '&:hover': {
            backgroundColor: '#c48f65'
        },
        bordercolor: '#FFF'
    }
})(Button);


const WriteDiary = ({handleTitleChange, handleContentsChange, onCreate}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <div>
                <DiaryTextField
                    className={classes.bottomMargin}
                    id="title"
                    label="Title"
                    autoFocus
                    fullWidth
                    onChange={handleTitleChange}
                />
                <DiaryTextField
                    className={classes.bottomMargin}
                    id="content"
                    label="Diary Content"
                    multiline
                    rows={19}
                    fullWidth
                    variant="outlined"
                    onChange={handleContentsChange}
                />
            </div>
            <Divider/>
            <div className={classes.display}>
                <div className={classes.grow}/>
                <Button variant="contained"
                        size="medium"
                        color="primary"
                        startIcon={<Share/>}>
                    공유
                </Button>
                <WriteButton
                    className={classes.button}
                    variant="contained"
                    size="medium"
                    color="primary"
                    startIcon={<Save/>}
                    onClick={onCreate}
                >
                    저장
                </WriteButton>
            </div>

        </Paper>

    );
}
export default WriteDiary;