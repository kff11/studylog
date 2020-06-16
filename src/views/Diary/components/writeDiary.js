import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        minHeight: 500,
        minWidth: 300,
    },
    bottomMargin: {
        marginBottom: 20,
    },
    grow: {
        flexGrow: 1,
    },
    display:{
      display: 'flex',
    },
    button: {
        marginLeft: 12,
    },
}));


const WriteDiary = ({handleTitleChange, handleContentsChange, onCreate}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <div>
                <TextField
                    className={classes.bottomMargin}
                    id="standard-textarea"
                    label="Title"
                    autoFocus
                    fullWidth
                    onChange={handleTitleChange}
                />

                <TextField
                    className={classes.bottomMargin}
                    id="outlined-multiline-static"
                    label="Diary Content"
                    multiline
                    rows={18}
                    fullWidth
                    variant="outlined"
                    onChange={handleContentsChange}
                />
            </div>

            <div className={classes.display}>
                <div className={classes.grow}/>
                <Button variant="outlined" size="medium" color="default">
                    공유
                </Button>
                <Button
                    className={classes.button}
                    variant="contained" size="medium" color="primary" onClick={onCreate}>
                    저장
                </Button>
            </div>

        </Paper>

    );
}
export default WriteDiary;