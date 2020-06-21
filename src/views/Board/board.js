import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';

import {BoardItem, BoardList} from "./components/index";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root:{
        position: 'relative',
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
    },
    absolute: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Board = () => {

    const [boards, setBoards] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [openSearch, setOpenSearch] = React.useState(false); //search-button
    const [searchWord, setSearchWord]  = React.useState('전체 보기');

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

    const handleSearchClose = () => {
        setOpenSearch(false);
    };
    const handleSearchToggle = () => {
        setOpenSearch(!openSearch);
    };

    return (
        <div className={classes.root}>

            {/* 검색 창 등장! */}
            <Backdrop className={classes.backdrop} open={openSearch} >
                <SearchIcon onClick={handleSearchClose} />
                <TextField id="standard-basic" label="검색어를 입력해주세요" />
            </Backdrop>

            {/* 검색 버튼 */}
            <Tooltip title="Search" aria-label="Search" onClick={handleSearchToggle}>
                <Fab color="secondary" className={classes.absolute}>
                    <SearchIcon />
                </Fab>
            </Tooltip>

            {/* 검색어 등장! */}
            <Typography variant="h5" component="h2" gutterBottom xs={8}>
                #{searchWord}
            </Typography>

            <div className={classes.grid}>
                <Grid container justify="center" >
                    <Grid item xs={8}>
                        <BoardList
                            boards={boards}
                            page={page}
                            pages={pages}
                            handleChangePage={handleChangePage}
                        />
                    </Grid>
                </Grid>
            </div>

        </div>
    );
}
export default Board;