import React, {useEffect, useState} from "react";
import {WriteDiary, DiaryList} from "./components/index";

import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';


import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

//업데트트 된 건가?

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 12,
    },
    paper: {
        marginTop: 0,
        padding: 20,
    },
});

const Diary = () => {

    const classes = useStyles();

    const [input, setInput] = useState('hello');
    const [contentInput, setContentInput] = useState('content1');
    const [diaries, setDiaries] = useState([]);

    // 일기장 리스트 가져오기 (아이디 마다!)
    const getData = async () => {
        const res = await axios.get('/diary/get');
        setDiaries(res.data);
    }

    // 일기장 글 작성
    const addData = async (e) => {
        e.preventDefault();
        setInput('');
        const res = await axios('/diary/add', {
            method: 'POST',
            data: {
                title: input,
                contents: contentInput,
            },
        })
        if (res.data) {
            getData();
        }
    }

    const handleTitleChange = (e) => {
        setInput(e.target.value);
    };
    const handleContentsChange = (e) => {
        setContentInput(e.target.value);
    };

    const handleCreate = (e) => {
        addData(e);
        setInput('');
        setContentInput('');
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Grid container className={classes.root} spacing={3} justify="center">
                <Grid item xs={6}>
                    {/*  Write field */}
                    <Paper className={classes.paper}>
                        <WriteDiary
                            value={input}
                            contentValue={contentInput}
                            handleTitleChange={handleTitleChange}
                            handleContentsChange={handleContentsChange}
                            onCreate={handleCreate}
                        />
                    </Paper>

                </Grid>
                <Grid item xs={3}>
                    <Typography variant="overline" display="block" gutterBottom>
                        리스트
                    </Typography>
                    <DiaryList
                        diaries={diaries}
                    />
                </Grid>
            </Grid>

        </div>
    );
}
export default Diary;