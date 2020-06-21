import React, {useState} from 'react';
import Card from "@material-ui/core/Card";
import {
    CardHeader,
    IconButton,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    Collapse,
    MenuItem,
    Menu
} from "@material-ui/core";
import {AvatarPic} from "../../../images";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SmsIcon from "@material-ui/icons/Sms";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';


import {CommentForm, CommentItem, CommentList} from ".//index";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 17,
        marginBottom: 5,
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
    const {name, title, date, contents, _comments, verify, handleOpen} = props;
    const classes = useStyles();
    const currentTime = new Date();


    //작성 시간 : form -> boardItem -> comment?
    const [comments, setComments] = useState(
        [
            {id: 0, username: '김지똥', contents: '아 어렵네', date: '2020.20.20'},
            {id: 1, username: '김슈슈', contents: '아 너무 어렵네', date: '2020.21.21'},
        ]
    );

    const [anchorEl, setAnchorEl] = useState(null); //삭제 및 수정
    const [expanded, setExpanded] = useState(false); //댓글창 열리게

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

    const handleMenuOpen = () => {
        handleClose();
        handleOpen();
    }


    return (
        <Card className={classes.root} elevation={2}>
            <CardHeader
                avatar={<Avatar aria-label="avatar" src={AvatarPic}/>}
                action={
                    <IconButton disabled={verify} aria-controls="this card's menu" aria-haspopup="true"
                                onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>

                }
                title={<div className={classes.title}>{title}</div>}
                subheader={<div><b>{name}</b> {date.substr(0, 16)}</div>}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleMenuOpen}>수정하기</MenuItem>
                <MenuItem onClick={handleClose}>공유취소</MenuItem>
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
    loginId: PropTypes.string,
    user_id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    contents: PropTypes.string,
    date: PropTypes.string,
    verify: PropTypes.bool,
    comments: PropTypes.object,
    handleOpen: PropTypes.func,
}

export default BoardItem;