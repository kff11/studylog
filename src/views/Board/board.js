import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import {BoardForm, BoardItem} from "./components/index";


const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: 15,
    },
    root: {
        display: "flex",
        justifyContent: "center",
        // width: 12xs,
    },
    boardListItem: {
        Width: 645,
        maxWidth: 645,
        marginBottom: 20,
    },
    margin_top: {
        marginTop:"64px",
    }
}));

const Board = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>

            <div>
                {/*<BoardList/>*/}
                {/*<BoardListItem/>*/}
                <BoardForm/>
                <BoardItem/>
            </div>


            {/*rightDrawer*/}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"
            >
                {/*<div style={{height: "64px",}}></div>*/}
                <Typography variant="h6" gutterBottom >
                    가장 댓글이 많은 글
                </Typography>
                <div className="board-ranking" className={classes.margin_top}>
                    <Typography variant="body1" gutterBottom>1. 리스트 가져와야함</Typography>
                    <Typography variant="body1" gutterBottom>2. DB에서 처리해야하나?</Typography>
                    <Typography variant="body1" gutterBottom>3. 댓글 순위 나누기</Typography>
                </div>

            </Drawer>

        </div>
    );
}
export default Board;