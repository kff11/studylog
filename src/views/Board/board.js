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
                <div style={{height: "64px",}}></div>
                <Typography variant="h6" gutterBottom>
                    가장 댓글이 많은 글
                </Typography>

            </Drawer>

        </div>
    );
}
export default Board;