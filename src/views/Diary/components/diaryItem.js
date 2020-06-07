import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root : {
        marginBottom : 12,
    },
    title : {
        fontSize : 16,
    },
    date : {
        fontSize : 12,
        textAlign:"right",
    }
});

const DiaryItem = ({id, title, date, contents, key}) => {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography className={classes.title} variant="h6" component="h2" >
                        {title}
                    </Typography>
                    <Typography variant="h6" component="h2" >
                        {contents}
                    </Typography>
                    <Typography className={classes.date} variant="body2" color="textSecondary" component="p">
                        {date}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default DiaryItem;