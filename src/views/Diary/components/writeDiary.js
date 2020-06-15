import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    bottomMargin: {
        marginBottom: 20,
    },
    button: {
        marginLeft: 12,
    },
}));


const WriteDiary = ({handleTitleChange, handleContentsChange, onCreate}) => {
    const classes = useStyles();

    return (
        <div>
            <div>
                <TextField
                    className={classes.bottomMargin}
                    id="standard-textarea"
                    label="Title"
                    fullWidth
                    multiline
                    onChange={handleTitleChange}
                />

                <TextField
                    className={classes.bottomMargin}
                    id="outlined-multiline-static"
                    label="Diary Content"
                    multiline
                    fullWidth
                    variant="outlined"
                    onChange={handleContentsChange}
                />
            </div>

            <div>
                <Button variant="outlined" size="small" color="primary">
                    공유
                </Button>
                <Button
                    className={classes.button}
                    variant="outlined" size="small" color="primary" onClick={onCreate}>
                    저장
                </Button>
            </div>

        </div>

    );
}
export default WriteDiary;