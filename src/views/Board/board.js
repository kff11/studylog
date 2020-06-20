import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import {BoardItem, BoardList} from "./components/index";
import axios from "axios";


const drawerWidth = 210;

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

            <div>
                <BoardList
                    boards={boards}
                    page={page}
                    pages={pages}
                    handleChangePage={handleChangePage}
                />
            </div>
        </div>
    );
}
export default Board;