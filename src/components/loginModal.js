import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Main} from "../pages/index";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.mjc.ac.kr/mjcIndex.do">
                소문난 김가네
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const LoginModal = ({setLogged}) => {
    const classes = useStyles();

    const [id, setID] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [login, setLogin] = React.useState(false);

    const changeID = () => {
        const id_v = document.getElementById('id').value;
        setID(id_v);
    }
    const changePW = () => {
        const pw_v = document.getElementById('password').value;
        setPassword(pw_v);
    }

    const selectUserData = async (e) => {
        e.preventDefault();

        const _id = id.trim();
        const _password = password.trim();

        if (_id === "") {
            return alert('아이디를 입력해 주세요!')

        } else if (_password === "") {
            return alert('비밀번호를 입력해 주세요!')
        }

        const res = await axios('/user/login', {
            method: 'POST',
            data: {id, password},
            password: password,
            headers: new Headers(),
        });

        if (res.data) {
            window.location.reload();
            setLogged(true);
            setLogin(true);

        } else {
            return alert('아이디 혹은 비밀번호가 일치하지 않습니다.')
        }

    }

    return (
        <div>
            <Container maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="아이디"
                            id="id"
                            name="id"
                            autoFocus
                            onChange={changeID}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={changePW}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="자동 로그인"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={selectUserData}>로그인</Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </div>
    )
}
export default LoginModal;