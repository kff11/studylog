import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {AvatarPic} from '../../images';
import SmsIcon from '@material-ui/icons/Sms';

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
    root : {
        display: "flex",
        justifyContent: "center",
        // width: 12xs,
    },
    boardListItem:{
        Width: 645,
        maxWidth:645,
        marginBottom : 20,
    },
}) );

const Board = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>

            <div >
                {/*<BoardList/>*/}
                {/*<BoardListItem/>*/}
                <Card className={classes.boardListItem}>
                    <Card item>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="avatar" src={AvatarPic} />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="게시글 제목"
                            subheader="김승수 September 14, 2016"
                        />
                        <CardContent>
                            <Typography variant="body2"  component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton  size="small" aria-label="delete" disabled color="primary">
                                <SmsIcon  />
                                <Typography variant="subtitle2"  component="p">
                                    12
                                </Typography>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Card>


                <Card className={classes.boardListItem}>
                    <Card item>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="avatar" src={AvatarPic} />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="게시글 제목"
                            subheader="김승수 September 14, 2016"
                        />
                        <CardContent>
                            <Typography variant="body2"  component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton  size="small" aria-label="delete" disabled color="primary">
                                <SmsIcon  />
                                <Typography variant="subtitle2"  component="p">
                                    12
                                </Typography>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Card>
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
                <div style={{height:"64px",}}></div>
                <Typography variant="h6" gutterBottom>
                    가장 댓글이 많은 글
                </Typography>

            </Drawer>

        </div>
    );
}
export default Board;