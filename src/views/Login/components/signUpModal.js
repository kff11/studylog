import React from 'react';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from "@material-ui/core/Link";

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
const useStyles = makeStyles((theme) => ({
    paper: {
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
        marginTop: theme.spacing(3),
    },
}));

const SignUpModal = ({handleClose}) => {

    const classes = useStyles();

    const [id, setID] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_crt, setPassword_crt] = React.useState("");
    const [name, setName] = React.useState("");

    const changeID = (e) => {
        setID(e.target.value);
    }

    const changePW = (e) => {
        setPassword(e.target.value);
    }

    const changePW_C = (e) => {
        setPassword_crt(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value);
    }

    const pushUserData = async () => {
        // 정규표현식!
        const id_check = /^[a-z]+[a-z0-9]{5,14}$/g; // 아이디 *영소문자 시작 6~15자
        const pw_check = /^[A-za-z0-9]{5,19}$/g; // 영문, 숫자 6~20자
        const name_check = /^[가-힣]{2,10}$/; // 이름 *한글 2~10자

        // 아이디 체크
        if (!id_check.test(id)) {
            return alert('아이디는 영문자로 시작하는 6~15자여야만 합니다. (소문자)')
        }

        // 비밀번호 체크
        if (!pw_check.test(password)) {
            return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')
        } else if (password !== password_crt) {
            return alert('비밀번호 확인이 일치하지 않습니다.')
        }

        // 이름 체크
        if (!name_check.test(name)) {
            return alert("이름은 한글로 시작하는 2~10자여야만 합니다.")
        }

        const data = {
            id: id,
            password: password,
            name: name,
        };

        const signUp = await axios('/user/add', {
            method: 'POST',
            data: data,
            headers: new Headers(),
        });

        if (!signUp.data) {
            return alert('이미 존재하는 아이디입니다.')
        } else {
            alert('회원가입이 완료되었습니다!');
            handleClose();
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                helperText='영문(소문자)로 시작하는 6~15자'
                                fullWidth
                                id="signId"
                                label="아이디"
                                autoFocus
                                onChange={changeID}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                helperText='영문, 숫자 6~20자'
                                fullWidth
                                label="비밀번호"
                                type="password"
                                id="signPassword"
                                autoComplete="current-password"
                                onChange={changePW}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="비밀번호 확인"
                                type="password"
                                id="signPassword_correct"
                                autoComplete="current-password"
                                onChange={changePW_C}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                helperText='한글로 시작하는 2~10자'
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="이름"
                                onChange={changeName}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={pushUserData}
                    >
                        회원가입
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
export default SignUpModal;