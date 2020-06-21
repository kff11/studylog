import React from 'react';
import {BoardItem} from "./index";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
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

const BoardList = props => {
    const {boards, page, pages, loginId, handleOpen, handleChangePage} = props;
    const classes = useStyles();

    const boardItem = boards.map(({id, user_id, user_name, title, contents, board_date, isBoard}) => (
            <BoardItem
                user_id={user_id}
                name={user_name}
                contents={contents}
                title={title}
                verify={!(user_id === loginId) ? true : false}
                date={board_date}
                handleOpen={() => handleOpen(id, title, contents, isBoard)}
            />
        )
    );

    return (
        <div className={classes.root}>
            {boards.length !== 0 ?
                boardItem
                :
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
BoardList.propTypes = {
    boards: PropTypes.array,
    page: PropTypes.number,
    pages: PropTypes.number,
    loginId: PropTypes.string,
    handleChangePage: PropTypes.func,
}

export default BoardList;