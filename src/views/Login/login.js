import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import {loginPic} from '../../images';

import {LoginItem, SignUpModal} from "./components"
import {Redirect} from "react-router-dom";
import {Hidden} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(5, 7, 7),
    },
    image: {
        width: '350px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1, 6),
        marginRight: theme.spacing(5),
    },
    signUp: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(4, 7),
    }
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

const Login = ({logged}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const renderSignUpModal = () => {
        return (
            <div>
                <Modal
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <SignUpModal handleClose={handleClose}/>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }

    return (
        logged ? <Redirect to='/'/> :
            <div className='background'>
                <div className='centered'>
                    <div className='flex-container'>
                        <Hidden smDown>
                            <img src={loginPic} alt="" className={classes.image}/>
                            <div>
                                <div className={classes.paper}>
                                    <LoginItem/>
                                </div>
                                <Box mt={2} className={classes.signUp}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={handleOpen}>회원가입</Button>
                                </Box>
                            </div>
                        </Hidden>
                        <Hidden mdUp>
                            <div>
                                <div className={classes.paper}>
                                    <LoginItem/>
                                </div>

                                <Box mt={2} className={classes.signUp}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={handleOpen}>회원가입</Button>
                                </Box>
                            </div>
                        </Hidden>
                    </div>
                    <Box mt={3}>
                        <Copyright/>
                    </Box>
                </div>
                {renderSignUpModal()}
            </div>


    )
}
export default Login;