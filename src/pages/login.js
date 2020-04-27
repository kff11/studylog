import React from 'react';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {LoginModal, SignUpModal} from "../components/index"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const LoginButton = withStyles({
    root: {
        fontSize: 20,
    }
})(Button);

const Login = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [modal, setModal] = React.useState("");

    const signUpOpen = () => {
        setModal('signUp');
        setOpen(true);
    }

    const loginOpen = () => {
        setModal('login');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalCompoenent = () => {
        return (
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {modal === 'login' ? <LoginModal/> : <SignUpModal/>}
                    </div>
                </Fade>
            </Modal>
        );
    }

    return (
        <div className='centered'>
            <h2>스터디로그</h2>
            <h3>명지전문대 소프트웨어콘텐츠과 소문난 김가네팀</h3>
            <LoginButton variant="outlined" color="primary" size="Large" onClick={loginOpen}>
                로그인
            </LoginButton>
            <br/><br/>
            <LoginButton variant="contained" color="primary" size="Large" onClick={signUpOpen}>
                회원가입
            </LoginButton>
            <br/><br/>

            {modalCompoenent()}
        </div>
    )
}
export default Login;