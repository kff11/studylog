import React, {useEffect, useState} from "react";

import {ProfileAccountItem, ProfileDetailsItem} from "./components";

import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },

}));

const Profile = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [_name, _setName] = useState('');
    const [mento, setMento] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');

    const getProfile = async () => {
        const res = await axios.get('/user/get')
        if (res.data) {
            setName(res.data[0].name);
            _setName(res.data[0].name);
            setMento(res.data[0].mento);
            setEmail(res.data[0].email);
            setPhone(res.data[0].phone);
            setState(res.data[0].state);
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeMento = (e) => {
        setMento(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleChangeState = (e) => {
        setState(e.target.value);
    }
    const handleSubmitProfile = async () => {
        const name_check = /^[가-힣]{2,10}$/; // 이름 *한글 2~10자

        // 이름 체크
        if (!name_check.test(name)) {
            return alert("이름은 한글로 시작하는 2~10자여야만 합니다.")
        }

        const res = await axios('/user/update', {
            method: 'POST',
            data: {
                name: name,
                email: email,
                phone: phone,
                state: state,
            }
        })
        if(res.data){
            getProfile();
            return alert("프로필 수정이 완료되었습니다!");
        }

    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={4}
                    xs={12}
                >
                    <ProfileAccountItem
                        name={_name}
                        mento={mento}
                    />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <ProfileDetailsItem
                        name={name}
                        email={email}
                        phone={phone}
                        state={state}
                        handleChangeName={handleChangeName}
                        handleChangeMento={handleChangeMento}
                        handleChangeEmail={handleChangeEmail}
                        handleChangePhone={handleChangePhone}
                        handleChangeState={handleChangeState}
                        handleSubmitProfile={handleSubmitProfile}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default Profile;