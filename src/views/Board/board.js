import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';

import {BoardItem, BoardList} from "./components/index";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
    },
}));

const Board = () => {

    const [boards, setBoards] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    const classes = useStyles();

    useEffect(() => {
        getBoard(1);
    }, [])

    const getBoard = async (pageNum) => {
        const res = await axios('/board/get', {
            method: 'POST',
            data: {
                page: pageNum,
                limit: limit,
            }
        });
        setBoards(res.data['rows']);
        getAllPage(res.data['count']);
    }

    const getAllPage = (count) => {
        let pageArray = [];
        for (let i = 1; i <= Math.ceil(count / limit); i++) {
            pageArray.push(i);
        }
        setPages(pageArray);
    }

    const handleChangePage = (pageNum) => {
        setPage(pageNum);
        getBoard(pageNum);
    }

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <BoardList
                        boards={boards}
                        page={page}
                        pages={pages}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default Board;