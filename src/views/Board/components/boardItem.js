import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import {
    CardHeader,
    IconButton,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    Collapse,
} from "@material-ui/core";
import SmsIcon from "@material-ui/icons/Sms";
import {Create} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import axios from 'axios';


import {CommentForm, CommentList} from "./index";

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
    const {id, loginId, loginName, name, title, date, contents, verify, avatar, CommentAvatar, handleOpen} = props;
    const classes = useStyles();

    //작성 시간 : form -> boardItem -> comment?
    const [comments, setComments] = useState([]);
    const [expanded, setExpanded] = useState(false); //댓글창 열리게
    const [input, setInput] = useState(''); //댓글 작성성

    const getComments = async () => {
        const res = await axios('/comment/get', {
            method: 'POST',
            data: {
                diary_id: id,
            }
        });
        setComments(res.data);
    }

    const addComment = async () => {
        const res = await axios('/comment/add', {
            method: 'POST',
            data: {
                diary_id: id,
                user_name: loginName,
                user_id: loginId,
                contents: input
            }
        })
        if (res.data) {
            alert('댓글 작성되었습니다!')
            getComments();
            setInput('');
        }
    }

    const delComment = async (id) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            const res = await axios('/comment/del', {
                method: 'POST',
                data: {
                    id: id,
                }
            })
            if (res.data) {
                alert('삭제되었습니다!')
                getComments();
            }
        }
    }

    const handleKeyPress = (e) => {
        //눌려진 키가 Enter이면 handleCreate호출파기
        if (e.key === 'Enter') {
            addComment();
        }
    }
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (!expanded) {
            getComments();
        }
    };

    useEffect(() => {
        getComments();
        setExpanded(false);
    }, [id]);

    return (
        <Card className={classes.root} elevation={2}>
            <CardHeader
                avatar={<Avatar aria-label="avatar" src={avatar}/>}
                action={
                    <IconButton disabled={verify} aria-controls="this card's menu" aria-haspopup="true"
                                onClick={handleOpen}>
                        <Create/>
                    </IconButton>

                }
                title={<div className={classes.title}>{title}</div>}
                subheader={<div><b>{name}</b> {date.substr(0, 16)}</div>}
            />
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
                    <Typography aria-label="comment" variant="subtitle2" component="p"
                                style={{marginLeft: 4, marginBottom: 1}}>
                        <b>{comments.length}</b>
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
                        avatar={CommentAvatar}
                        onChange={handleChange}
                        onCreate={addComment}
                        onKeyPress={handleKeyPress}
                    />
                    <CommentList
                        loginId={loginId}
                        delComment={delComment}
                        comments={comments}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );

}

BoardItem.propTypes = {
    id: PropTypes.number,
    loginId: PropTypes.string,
    loginName: PropTypes.string,
    user_id: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    contents: PropTypes.string,
    date: PropTypes.string,
    verify: PropTypes.bool,
    comments: PropTypes.object,
    CommentAvatar: PropTypes.string,
    handleOpen: PropTypes.func,
}

export default BoardItem;