import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

import {loginIcon} from '../../../images';


const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: '250px',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

}));


const LoginItem = () => {
    const classes = useStyles();

    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleChangeId = (e) => {
        setId(e.target.value);
    }
    const handleChangePw = (e) => {
        setPassword(e.target.value);
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

        } else {
            return alert('아이디 혹은 비밀번호가 일치하지 않습니다.')
        }

    }

    return (
        <div>
            <div className={classes.paper}>
                <img src={loginIcon} width='200' alt=""/>
                <form className={classes.form} noValidate>
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="none"
                        required
                        fullWidth
                        label="아이디"
                        autoFocus
                        onChange={(e) => handleChangeId(e)}
                    />
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        label="비밀번호"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => handleChangePw(e)}
                    />
                    <Box mt={1}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={selectUserData}>로그인</Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}
export default LoginItem;