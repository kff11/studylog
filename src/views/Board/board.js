import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';

import {BoardList} from "./components/index";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {Backdrop, Fade, Modal} from "@material-ui/core";
import {ReadDiary} from "../Diary/components";
import {useCookies} from "react-cookie";
import jwt from "jsonwebtoken";
import jwtKey from "../../config/jwt";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
    },
    modal: {
        marginRight: 30,
        marginLeft: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    diaryModal: {
        border: '3px solid',
        borderColor: '#61380B',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
    },
}));

const Board = () => {

    const [cookies] = useCookies('user');
    const decoded = jwt.decode(cookies.user, jwtKey.secret);

    const [open, setOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [readId, setReadId] = useState('');
    const [readTitle, setReadTitle] = useState('');
    const [readContent, setReadContent] = useState('');
    const [readShared, setReadShared] = useState(false);

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

    //----------수정하기
    const delDiary = async () => {
        if (window.confirm('삭제하시겠습니까?')) {
            const res = await axios('/diary/del', {
                method: 'POST',
                data: {
                    id: readId,
                },
            })
            if (res.data) {
                alert('삭제되었습니다!')
                handleClose();
                getBoard(page);
            }
        }
    }

    const updateDiary = async () => {
        const res = await axios('/diary/modify', {
            method: 'POST',
            data: {
                id: readId,
                title: readTitle,
                contents: readContent,
            },
        })
        if (res.data) {
            alert('수정되었습니다!')
            getBoard(page);
        }
    }

    const shareDiary = async () => {
        if (window.confirm('공유하시겠습니까?')) {
            const res = await axios('/diary/share', {
                method: 'POST',
                data: {
                    id: readId
                },
            })
            if (res.data) {
                alert('공유되었습니다!')
                handleClose();
                getBoard(page);
            } else {
                alert('잠시 후 다시 시도해 주십시오.')
            }
        }
    }

    const cancelShare = async () => {
        if (window.confirm('공유를 취소하시겠습니까?')) {
            const res = await axios('/diary/cancel', {
                method: 'POST',
                data: {
                    id: readId
                },
            })
            if (res.data) {
                alert('공유가 취소되었습니다!');
                handleClose();
                getBoard(page);
            } else {
                alert('잠시 후 다시 시도해 주십시오.');
            }
        }
    }

    const handleOpen = (id, title, content, isBoard) => {
        setReadId(id);
        setReadTitle(title);
        setReadContent(content);
        setReadShared(isBoard)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReadTitleChange = (e) => {
        setReadTitle(e.target.value);
    }

    const handleReadContentChange = (e) => {
        setReadContent(e.target.value);
    }

    const renderDiary = () => {
        return (
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.diaryModal}>
                        <ReadDiary
                            title={readTitle}
                            content={readContent}
                            isShared={readShared}
                            updateDiary={updateDiary}
                            cancelShare={cancelShare}
                            handleDelete={delDiary}
                            handleReadTitleChange={handleReadTitleChange}
                            handleReadContentChange={handleReadContentChange}
                        />
                    </div>
                </Fade>

            </Modal>

        );
    }
    //----------수정하기

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <BoardList
                        boards={boards}
                        page={page}
                        pages={pages}
                        loginId={decoded.user_id}
                        loginName={decoded.name}
                        handleOpen={handleOpen}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
            {renderDiary()}
        </div>
    );
}

export default Board;