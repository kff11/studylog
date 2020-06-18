import React from "react";

import PropTypes from "prop-types";

import {makeStyles} from '@material-ui/core/styles';
import {AvatarPic} from '../../../images';
import {Card, CardActions, CardContent, Divider, Button, Avatar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex'
    },
    avatar: {
        marginLeft: 'auto',
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    },
    grow: {
        flexGrow: 1,
    },
}));

const ProfileAccountItem = props => {
    const {name, mento} = props;
    const classes = useStyles();

    const user = {
        name: name,
        avatar: AvatarPic,
        mento: mento ? '멘토' : '학습자',
    }

    return (
        <Card elevation={2}>
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >
                            {user.name}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            {user.mento}
                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src={user.avatar}
                    />
                </div>
            </CardContent>
            <Divider/>
            <CardActions>
                <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                >
                    사진 업로드
                </Button>
                <div className={classes.grow}/>

                <Button variant="text"
                color="secondary">사진 지우기</Button>
            </CardActions>
        </Card>
    )
}

ProfileAccountItem.propTypes = {
    name: PropTypes.string,
    mento: PropTypes.string,
}

export default ProfileAccountItem;