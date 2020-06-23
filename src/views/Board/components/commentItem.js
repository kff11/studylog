import React from "react";

import Avatar from "@material-ui/core/Avatar";

import {makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";

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

const CommentItem = ({id, user_name, contents, date, verify, avatar, delComment}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="user" src={avatar}/>
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
                        onClick={() => delComment(id)}>
                <Delete/>
            </IconButton>
        </div>
    );
}

export default CommentItem;