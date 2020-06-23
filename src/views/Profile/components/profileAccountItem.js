import React, {useEffect} from "react";

import PropTypes from "prop-types";

import {makeStyles} from '@material-ui/core/styles';
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
    const {userId, name, mento, avatar, handleChangeImage, handleDeleteImage} = props;
    const classes = useStyles();

    const user = {
        userId: userId,
        name: name,
        avatar: avatar,
        mento: mento ? '멘토' : '학습자',
    }

    const handleUploadClick = (e) => {
        document.getElementById('img').click();
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
                            variant="body2"
                        >
                            {user.userId}
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
                        onClick={handleUploadClick}
                    >
                        사진 업로드
                    </Button>
                <input id='img' name='img' type="file" style={{display: 'none'}} onChange={handleChangeImage}/>
                <div className={classes.grow}/>

                <Button variant="text"
                        onClick={handleDeleteImage}
                        color="secondary">사진 지우기</Button>
            </CardActions>
        </Card>
    )
}

ProfileAccountItem.propTypes = {
    avatar: PropTypes.string,
    userId: PropTypes.string,
    name: PropTypes.string,
    mento: PropTypes.string,
    handleDeleteImage: PropTypes.func,
    handleChangeImage: PropTypes.func,
}

export default ProfileAccountItem;