import React from "react";
import { WriteDiary, DiaryItem, DiaryList } from "../components/index";

import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';


import {makeStyles} from "@material-ui/core/styles";

//업데트트 된 건가?

const useStyles = makeStyles({
    root : {
        flexGrow: 1,
        marginTop : 12,
    },
    paper: {
        marginTop : 0,
        padding: 20,
    },
});

const Diary = () => {

    const classes = useStyles();

    const [input, setInput] = React.useState('hello');
    const [contentInput,setContentInput] = React.useState('content1');
    const [diaries, setDiaries] = React.useState([
        {id:0,title:'title1',date:'2121.21.21', content:'일기내용'},
        {id:1,title:'title2',date:'2121.21.21', content:'일기내용'}]
    );

    var id = 1;

    const handleChange = (e)=> {
        setInput(e.target.value);
    };

    const handleCreate = () => {
        setInput('next');
        setContentInput('next content 아 어렵구마');
        setDiaries(diaries.concat({
            id: id++,
            title: input,
            date : '2029.29.29',
            content: contentInput,
        }))
    }

    return (
        <div>
            <Grid container className={classes.root} spacing={3} justify="center">
                <Grid item item xs={6}>
                    {/*  Write field */}
                    <Paper  className={classes.paper}>
                        <WriteDiary
                            value={input}
                            contentValue={contentInput}
                            onChange={handleChange}
                            onCreate={handleCreate}
                        />
                    </Paper>

                </Grid>
                <Grid item item xs={3} >
                    <Typography variant="overline" display="block" gutterBottom>
                        리스트
                    </Typography>
                    <DiaryList
                        diaries={diaries}
                    />
                </Grid>
            </Grid>

        </div>
    );
}
export default Diary;