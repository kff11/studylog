import React, {useEffect, useState} from "react";
import {WriteDiary, ReadDiary, DiaryList} from "./components/index";
import {Backdrop, Fade, Grid, Modal, Paper, Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    modal: {
        marginRight: 30,
        marginLeft: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    paper: {
        padding: 20,
    },
    diaryModal: {
        border: '3px solid',
        borderColor: '#61380B',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
    },
}));

const Diary = () => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [diaries, setDiaries] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [readId, setReadId] = useState('');
    const [readTitle, setReadTitle] = useState('');
    const [readContent, setReadContent] = useState('');


    useEffect(() => {
        getDiary(1);
    }, [])

    // 일기장 리스트 가져오기 (아이디 마다!)
    const getDiary = async (pageNum) => {
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
    const addDiary = async (e) => {
        e.preventDefault();
        const res = await axios('/diary/add', {
            method: 'POST',
            data: {
                title: titleInput,
                contents: contentInput,
            },
        })
        if (res.data) {
            alert("일기가 작성되었습니다!");
            setTitleInput('');
            setContentInput('');
            getDiary(page);
        } else {
            alert('잠시 후 다시 시도해 주십시오.')
        }
    }

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
                getDiary(page);
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
            getDiary(page);
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
                getDiary(page);
            } else {
                alert('잠시 후 다시 시도해 주십시오.')
            }
        }
    }

    const getAllPage = (count) => {
        let pageArray = [];
        for (let i = 1; i <= Math.ceil(count / limit); i++) {
            pageArray.push(i);
        }
        setPages(pageArray);
    }

    const handleOpen = (id, title, content) => {
        setReadId(id);
        setReadTitle(title);
        setReadContent(content);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleTitleChange = (e) => {
        setTitleInput(e.target.value);
    };

    const handleContentsChange = (e) => {
        setContentInput(e.target.value);
    };

    const handleReadTitleChange = (e) => {
        setReadTitle(e.target.value);
    }

    const handleReadContentChange = (e) => {
        setReadContent(e.target.value);
    }

    const handleChangePage = (pageNum) => {
        setPage(pageNum);
        getDiary(pageNum);
    }

    const handleCreate = (e) => {
        if (titleInput.trim() === '') {
            alert('제목을 입력해 주세요!')
        } else if (contentInput.trim() === '') {
            alert('내용을 입력해 주세요!')
        } else {
            addDiary(e);
            setTitleInput('');
            setContentInput('');
        }
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
                            updateDiary={updateDiary}
                            shareDiary={shareDiary}
                            handleDelete={delDiary}
                            handleReadTitleChange={handleReadTitleChange}
                            handleReadContentChange={handleReadContentChange}
                        />
                    </div>
                </Fade>

            </Modal>

        );
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={4} justify="center">
                <Grid item md={8}>
                    {/*  Write field */}
                    <WriteDiary
                        title={titleInput}
                        content={contentInput}
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
                        handleOpen={handleOpen}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
            {renderDiary()}
        </div>
    );
}
export default Diary;