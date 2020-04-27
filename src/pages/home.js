import React, {useEffect} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import '../App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    input: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    table: {
        minWidth: 650,
    },
}));

const WriteButton = withStyles({
    root: {
        fontSize: 20,
    }
})(Button);

const Home = () => {
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
        sessionStorage.getItem('login') ?
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        스터디로그
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        {['일기장'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                <div className='App'>
                    <br/>
                    <form className={classes.input} noValidate autoComplete="off" method='POST' onSubmit={addData}>
                        <TextField id="outlined-basic" label="한마디 남기기" variant="outlined" type='text' maxLength='150'
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
                                                    <TableCell style={{color: '#ababab'}} onClick={() => delData(el)}
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
            </main>
        </div>
            : <Redirect to="/"/>
    );
}
export default Home;