import React, {useEffect, useState} from "react";
import {WriteDiary, DiaryList} from "./components/index";
import {Grid, Paper, Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    grow: {
        flexGrow: 1,
    },
    paper: {
        padding: 20,
    },
}));

const Diary = () => {

    const classes = useStyles();

    const [input, setInput] = useState('hello');
    const [contentInput, setContentInput] = useState('content1');
    const [diaries, setDiaries] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);


    useEffect(() => {
        getData();
    }, [])

    // 일기장 리스트 가져오기 (아이디 마다!)
    const getData = async () => {
        const res = await axios.get('/diary/get');
        setDiaries(res.data);
        getAllPage(res.data.length);
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

    const getAllPage = (count) => {
        let pageArray = [];
        for (let i = 1; i <= count / limit; i++) {
            pageArray.push(i);
        }
        setPages(pageArray);
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


    return (
        <div className={classes.root}>
            <Grid container spacing={3} justify="center">
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
                <div className={classes.grow}/>
                <Grid item xs={3}>
                    <Typography variant="overline" display="block" gutterBottom>
                        리스트
                    </Typography>
                    <DiaryList
                        page={page}
                        pages={pages}
                        diaries={diaries}
                    />
                </Grid>
            </Grid>

        </div>
    );
}
export default Diary;