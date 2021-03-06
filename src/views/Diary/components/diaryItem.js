import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
        textAlign: "right",
    }
});

const DiaryItem = ({title, date, handleOpen}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation={2}>
            <CardActionArea onClick={handleOpen}>
                <CardContent>
                    <Typography className={classes.title} variant="h6" component="h2">
                        {title}
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