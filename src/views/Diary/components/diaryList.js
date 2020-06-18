import React, {useState} from 'react';
import {DiaryItem} from "./index";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    ul: {
        paddingInlineStart: '15px',
    },
    thisPage: {
        listStyle: 'none',
        marginRight: '15px',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '15px',
    },
    page: {
        listStyle: 'none',
        marginRight: '15px',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '13px',
    },
    progress: {
        margin: theme.spacing(2),
    }
}));

const DiaryList = ({diaries, page, pages, handleChangePage, handleOpen}) => {
    const classes = useStyles();

    const diaryItem = diaries.map(({id, title, contents, date}) => (
            <DiaryItem
                id={id}
                contents={contents}
                title={title}
                date={date}
                handleOpen={() => handleOpen(id, title, contents)}
            />
        )
    );

    return (
        <div className={classes.root}>
            {diaries.length !== 0 ? diaryItem :
                <Card className={classes.card} elevation={2}>
                    <CircularProgress className={classes.progress}/>
                </Card>
            }
            <Card className={classes.card} elevation={2}>
                <ChevronLeft/>
                <ul className={classes.ul}>
                    {pages ? pages.map((pageNum, key) => {
                            return (
                                pageNum === page ?
                                    <li key={key} className={classes.thisPage}>
                                        <b> {pageNum} </b>
                                    </li>
                                    :
                                    <li key={key} className={classes.page} onClick={() => handleChangePage(pageNum)}>
                                        {pageNum}
                                    </li>
                            )
                        })
                        :
                        null}
                </ul>
                <ChevronRight/>
            </Card>
        </div>
    );
}

export default DiaryList;