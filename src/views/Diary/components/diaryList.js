import React from 'react';
import {DiaryItem} from "./index";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginBottom: 12,
    },
    ul: {
        marginBlockStart: '0em',
        marginBlockEnd: '0em',
        paddingInlineStart: '15px',
    },
    thisPage: {
        color: '#61380B',
        listStyle: 'none',
        marginRight: '15px',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '15px',
    },
    page: {
        color: '#c48f65',
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

    const diaryItem = diaries.map(({id, title, contents, date, isBoard}) => (
            <DiaryItem
                id={id}
                contents={contents}
                title={title}
                date={date}
                handleOpen={() => handleOpen(id, title, contents, isBoard)}
            />
        )
    );

    return (
        <div className={classes.root}>
            {diaries.length !== 0 ? diaryItem :
                <Card className={classes.card} elevation={2}>
                    첫글을 작성해 주세요!
                </Card>
            }
            <Card className={classes.card} elevation={2}>
                <ChevronLeft/>
                <ul className={classes.ul}>
                    {pages ? pages.map((pageNum, key) => {
                            return (
                                pageNum === page ?
                                    <li key={key} className={classes.thisPage}>
                                        <b>{pageNum}</b>
                                    </li>
                                    :
                                    <li key={key} className={classes.page} onClick={() => handleChangePage(pageNum)}>
                                        <b>{pageNum}</b>
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