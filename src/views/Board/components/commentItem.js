import React from "react";

import Avatar from "@material-ui/core/Avatar";
import {AvatarPic} from "../../../images";
import Input from "@material-ui/core/Input";

import {makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop : 16,
        display: 'flex',
        width: '100%',
        align : 'center',
    },
    rightSide : {
        width: '100%',
        display : 'flex',
        flexDirection : 'column',
        marginLeft : 10,
        marginRight : 10,
    },
    takeFull : {
        flex : 1,
    },
    info : {
        display: 'flex',
    }
}));

const CommentItem = ()=> {
    const classes = useStyles();

    return(
            <div className={classes.root}>
                <Avatar alt="user" src={AvatarPic} />
                <div className={classes.rightSide}>
                    <div style={{ display:'flex', paddingRight : 16,}}  >
                        <Typography variant="body2" className={classes.takeFull}>닉네임</Typography>
                        <Typography variant="body2">2020.20.20</Typography>
                    </div>
                    <Input disabled className={classes.takeFull} defaultValue="written comment" />
                </div>
                <IconButton aria-controls="this card's menu" aria-haspopup="true">
                    <MoreVertIcon  />
                </IconButton>
            </div>
    );
}

export default CommentItem;