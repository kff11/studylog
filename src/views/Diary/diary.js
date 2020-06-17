import React, {useEffect, useState} from "react";
import {WriteDiary, DiaryList} from "./components/index";
import {Grid, Paper, Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import Card from "@material-ui/core/Card";

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

    const [input, setInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [diaries, setDiaries] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);


    useEffect(() => {
        getData(1);
    }, [])

    // 일기장 리스트 가져오기 (아이디 마다!)
    const getData = async (pageNum) => {
        const res = await axios('/diary/get', {
            method: 'POST',
            data: {
                page: pageNum,
                limit: limit,
            }
        });
        setDiaries(res.data['rows']);
        getAllPage(res.data['count']);
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
            getData(1);
        }
    }

    const getAllPage = (count) => {
        let pageArray = [];
        for (let i = 1; i <= Math.ceil(count / limit); i++) {
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

    const handleChangePage = (pageNum) => {
        setPage(pageNum);
        getData(pageNum);
    }

    const handleCreate = (e) => {
        addData(e);
        setInput('');
        setContentInput('');
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={4} justify="center">
                <Grid item md={8}>
                    {/*  Write field */}
                    <WriteDiary
                        value={input}
                        contentValue={contentInput}
                        handleTitleChange={handleTitleChange}
                        handleContentsChange={handleContentsChange}
                        onCreate={handleCreate}
                    />
                </Grid>
                <Grid item md={4}>
                    <Typography variant="overline" display="block" gutterBottom>
                        리스트
                    </Typography>
                    <DiaryList
                        page={page}
                        pages={pages}
                        diaries={diaries}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default Diary;