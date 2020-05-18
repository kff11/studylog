import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import '../App.css';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        input: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        table: {
            minWidth: 650,
        },
    }
}));

const WriteButton = withStyles({
    root: {
        fontSize: 20,
    }
})(Button);

const TestContents = () => {
    const [post, setPost] = React.useState('');
    const [list, setList] = React.useState([]);

    const classes = useStyles();

    const getData = async () => {
        const res = await axios.get('/post/get');
        if (res.data[0] === undefined) {
            let cover = [];
            cover.push(res.data);
            return setList(cover);
        }
        setList(res.data);
    }

    const addData = async (e) => {
        console.log(post);
        setPost('');
        e.preventDefault();
        const res = await axios('/post/add', {
            method: 'POST',
            data: {'data': post},
            headers: new Headers(),
        })

        if (res.data) {
            return window.location.reload();
        }
    }

    const delData = async (el) => {
        const remove = window.confirm(el.post + '를(을) 삭제하시겠습니까?');

        if (remove) {
            const body = {id: el.id}
            const res = await axios('/post/del', {
                method: 'POST',
                data: {'delete': body},
                headers: new Headers(),
            })

            if (res.data) {
                return window.location.reload();
            }
        }
    }

    const postUpdate = (e) => {
        setPost(e.target.value);
        console.log(e.target.value);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='App'>
            <form className={classes.input} noValidate autoComplete="off" method='POST' onSubmit={addData}>
                <TextField id="outlined-basic" label="한마디 남기기" variant="outlined" type='text'
                           maxLength='150'
                           onChange={(e) => postUpdate(e)}/>
                <WriteButton type="submit" variant="contained" color="primary" size="large">
                       　글쓰기　
                </WriteButton>
            </form>
            <br/>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>글 번호</TableCell>
                                <TableCell align="center">내용</TableCell>
                                <TableCell align="center">삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length !== 0 ?
                                list.map((el, key) => {
                                    return (
                                        <TableRow key={el.id}>
                                            <TableCell align='center' component="th" scope="row">
                                                {el.id}
                                            </TableCell>
                                            <TableCell align="center">{el.post}</TableCell>
                                            <TableCell style={{color: '#ababab'}}
                                                       onClick={() => delData(el)}
                                                       align="center">삭제</TableCell>
                                        </TableRow>
                                    )
                                })
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default TestContents;