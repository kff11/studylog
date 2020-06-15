import React, {useState} from 'react';
import {DiaryItem} from "./index";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        textAlign: 'center'
    },
    thisPage: {
        listStyle: 'none',
        marginRight: '15px',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '16px',
    },
    page: {
        listStyle: 'none',
        marginRight: '15px',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '13px',
    },
});

const DiaryList = ({diaries, page, pages}) => {
    const classes = useStyles();

    const diaryList = diaries.map(({id, title, contents, date}) => (
            <DiaryItem
                id={id}
                contents={contents}
                title={title}
                date={date}
            />
        )
    );
    console.log(page);
    console.log(pages);


    return (
        <div>
            {diaryList}
            <Card className={classes.root}>
                <ChevronLeft/>
                {pages ? <ul>
                        {pages.map((el, key) => {
                            console.log(el);
                            return (
                                el === page ?
                                    <li key={key} className={classes.thisPage}>
                                        <b> {el} </b>
                                    </li>
                                    :
                                    <li key={key} className={classes.page}>
                                        {el}
                                    </li>
                            )
                        })
                        }
                    </ul>
                    :
                    null}
                <ChevronRight/>
            </Card>
        </div>
    );
}

export default DiaryList;