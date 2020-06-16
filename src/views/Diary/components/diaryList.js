import React, {useState} from 'react';
import {DiaryItem} from "./index";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
      minWidth: 300,
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
});

const DiaryList = ({diaries, page, pages, handleChangePage}) => {
    const classes = useStyles();

    const diaryItem = diaries.map(({id, title, contents, date}) => (
            <DiaryItem
                id={id}
                contents={contents}
                title={title}
                date={date}
            />
        )
    );

    return (
        <div className={classes.root}>
            {diaryItem}
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