import React from "react";

import Avatar from "@material-ui/core/Avatar";
import {AvatarPic2} from "../../../images";

import {makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 16,
        display: 'flex',
        width: '100%',
        align: 'center',
    },
    rightSide: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    takeFull: {
        marginBottom: 5,
        flex: 1,
    },
    date: {
        marginTop: 10,
    },
    info: {
        display: 'flex',
    }
}));

const CommentItem = ({id, user_name, contents, date, verify, getComments}) => {
    const classes = useStyles();

    const delComment = async () => {
        if(window.confirm('댓글을 삭제하시겠습니까?')){
            const res = await axios('/comment/del', {
                method: 'POST',
                data: {
                    id: id,
                }
            })
            if(res.data){
                alert('삭제되었습니다!')
                getComments();
            }
        }
    }

    return (
        <div className={classes.root}>
            <Avatar alt="user" src={AvatarPic2}/>
            <div className={classes.rightSide}>
                <div style={{display: 'flex', paddingRight: 16,}}>
                    <Typography variant="body2" className={classes.takeFull}>
                        <b>{user_name}</b>
                    </Typography>
                    <Typography variant="body2" className={classes.date}>
                        {date}
                    </Typography>
                </div>
                <Typography variant="body2">
                    {contents}
                </Typography>
                {/*<Input disabled className={classes.takeFull}*/}
                {/*       defaultValue={contents} />*/}
            </div>
            <IconButton disabled={verify} aria-controls="this card's menu" aria-haspopup="true"
                        onClick={delComment}>
                <Delete/>
            </IconButton>
        </div>
    );
}

export default CommentItem;