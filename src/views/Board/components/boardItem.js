import React, {useState} from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {AvatarPic} from "../../../images";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import SmsIcon from "@material-ui/icons/Sms";
import {makeStyles} from "@material-ui/core/styles";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { CommentForm, CommentItem , CommentList} from ".//index";

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
    boardItem:{
        Width: 645,
        maxWidth:645,
        marginBottom : 20,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardActions : {
        padding : 16,
        // paddingBottom: 0,
    },
    delTopPadding : {
        paddingTop : 0,
    },
}) );

const BoardItem = () =>{
    const classes = useStyles();

    //댓글 리스트
    //작성 시간 : form -> boardItem -> comment?
    const [comments, setComments] = useState(
        [
            {id: 0,username:'김지똥' ,contents:'아 졸라 어렵네',date:'2020.20.20'},
            {id: 1,username:'김슈슈' ,contents:'아 졸라 어렵네',date:'2020.21.21'},
        ]
    );

    const [anchorEl, setAnchorEl] = React.useState(null); //삭제 및 수정
    const [expanded, setExpanded] = React.useState(false); //댓글창 열리게

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return(
        <div className={classes.root}>
            <Card className={classes.boardItem}>
                <Card item>

                    <CardHeader
                        avatar={
                            <Avatar aria-label="avatar" src={AvatarPic} />
                        }
                        action={
                            <IconButton aria-controls="this card's menu" aria-haspopup="true" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>

                        }
                        title="게시글 제목"
                        subheader="김승수 September 14, 2016"
                    />

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>삭제하기</MenuItem>
                        <MenuItem onClick={handleClose}>수정하기</MenuItem>
                    </Menu>


                    <CardContent >
                        <Typography variant="body2"  component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing className={classes.cardActions}
                                 onClick={handleExpandClick}
                    >
                        <IconButton  size="small" aria-label="article's comments" disabled color="primary">
                            <SmsIcon  aria-label="comment icon" />
                            <Typography  aria-label="comment" variant="subtitle2"  component="p">
                                12
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show comments"
                        >
                            <ExpandMoreIcon />
                        </IconButton>

                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className={classes.delTopPadding}>
                            {/* 댓글 입력 폼 */}
                            <CommentForm/>
                            <CommentList
                                comments={comments}
                            />
                        </CardContent>
                    </Collapse>

                </Card>
            </Card>
        </div>
    );

}

export default BoardItem;