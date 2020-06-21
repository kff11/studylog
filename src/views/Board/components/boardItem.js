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
import PropTypes, {func} from "prop-types";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {CommentForm, CommentItem, CommentList} from ".//index";

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        marginBottom: 20,
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
    cardActions: {
        padding: 16,
        // paddingBottom: 0,
    },
    delTopPadding: {
        paddingTop: 0,
    },
    cardContent: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(4),
    },
}));

const BoardItem = props => {
    const {name, title, date, contents, _comments} = props;
    const classes = useStyles();
    const setid = 1;
    const currentTime = new Date();


    //작성 시간 : form -> boardItem -> comment?
    const [comments, setComments] = useState(
        [
            {id: 0, username: '김지똥', contents: '아 어렵네', date: '2020.20.20'},
            {id: 1, username: '김슈슈', contents: '아 너무 어렵네', date: '2020.21.21'},
        ]
    );

    const [anchorEl, setAnchorEl] = React.useState(null); //삭제 및 수정
    const [expanded, setExpanded] = React.useState(false); //댓글창 열리게

    //댓글 작성성
    const [input, setInput] = React.useState('');

    const handleKeyPress = (e) => {
        //눌려진 키가 Enter이면 handleCreate호출파기
        if (e.key === 'Enter') {
            handleCreate();
        }
    }
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleCreate = (e) => {
        setInput('');
        setComments(
            comments.concat({
                id: comments.length,
                username: '유저 네임',
                contents: input,
                date: currentTime.toLocaleDateString() + currentTime.toLocaleTimeString()
            })
        )
        console.log('create');
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Card className={classes.root} elevation={2}>
            <CardHeader
                avatar={<Avatar aria-label="avatar" src={AvatarPic}/>}
                action={
                    <IconButton aria-controls="this card's menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>

                }
                title={<b>{title}</b>}
                subheader={name + ' ' + date}
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
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="p">
                    {contents}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}
                         onClick={handleExpandClick}
            >
                <IconButton size="small" aria-label="article's comments" disabled color="primary">
                    <SmsIcon aria-label="comment icon"/>
                    <Typography aria-label="comment" variant="subtitle2" component="p">
                        {comments.length}
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
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.delTopPadding}>
                    {/* 댓글 입력 폼 */}
                    <CommentForm
                        value={input}
                        onChange={handleChange}
                        onCreate={handleCreate}
                        onKeyPress={handleKeyPress}
                    />
                    <CommentList
                        comments={comments}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );

}

BoardItem.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    contents: PropTypes.string,
    date: PropTypes.string,
    comments: PropTypes.object,
}

export default BoardItem;