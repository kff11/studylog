import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {Save, Share, Create, Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    bottomMargin: {
        marginBottom: 30,
    },
    grow: {
        flexGrow: 1,
    },
    display: {
        marginTop: 20,
        display: 'flex',
    },
    button: {
        marginLeft: 12,
    },
}));

const DiaryTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#61380B',
        },
        '&:hover fieldset': {
            bordercolor: '#c48f65',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#c48f65'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#61380B',
            },
            '&:hover fieldset': {
                bordercolor: '#c48f65',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#c48f65',
            },
        },
    },

})(TextField);

const WriteButton = withStyles({
    root: {
        backgroundColor: '#CFB095',
        '&:hover': {
            backgroundColor: '#c48f65'
        },
    }
})(Button);


const ReadDiary = props => {
    const {id, title, content, updateDiary, handleReadTitleChange, handleReadContentChange} = props;
    const classes = useStyles();

    const [disable, setDisable] = useState(true);

    const handleDisable = () => {
        updateDiary();
        setDisable(true);
    }
    const handleAble = () => {
        setDisable(false);
    }

    return (
        <Paper className={classes.root} elevation={2}>
            <div>
                <DiaryTextField
                    className={classes.bottomMargin}
                    disabled={disable}
                    id="title"
                    label="Title"
                    value={title}
                    onChange={handleReadTitleChange}
                    autoFocus
                    fullWidth
                />
                <DiaryTextField
                    className={classes.bottomMargin}
                    disabled={disable}
                    id="content"
                    label="Diary Content"
                    multiline
                    value={content}
                    onChange={handleReadContentChange}
                    rows={19}
                    fullWidth
                    variant="outlined"
                />
            </div>
            <Divider/>
            {disable ?
                <div className={classes.display}>
                    <Button variant="contained"
                            size="medium"
                            color="primary"
                            startIcon={<Share/>}>
                        공유
                    </Button>
                    <div className={classes.grow}/>
                    <Button variant="contained"
                            size="medium"
                            color="secondary"
                            startIcon={<Delete/>}>
                        삭제
                    </Button>
                    <WriteButton
                        className={classes.button}
                        variant="contained"
                        size="medium"
                        color="primary"
                        autoFocus
                        onClick={handleAble}
                        startIcon={<Create/>}
                    >
                        수정
                    </WriteButton>
                </div>
                :
                <div className={classes.display}>
                    <div className={classes.grow}/>
                    <WriteButton
                        className={classes.button}
                        variant="contained"
                        size="medium"
                        color="primary"
                        autoFocus
                        onClick={handleDisable}
                        startIcon={<Save/>}
                    >
                        완료
                    </WriteButton>
                </div>
            }
        </Paper>
    );
}
ReadDiary.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    updateDiary: PropTypes.func,
    handleReadTitleChange: PropTypes.func,
    handleReadContentChange: PropTypes.func,
}
export default ReadDiary;