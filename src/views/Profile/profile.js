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

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [_name, _setName] = useState('');
    const [mento, setMento] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');
    const [avatar, setAvatar] = useState('');

    const getProfile = async () => {
        const res = await axios.get('/user/get')
        if (res.data) {
            setUserId(res.data.user_id);
            setName(res.data.name);
            _setName(res.data.name);
            setMento(res.data.mento);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setState(res.data.state);
            setAvatar(res.data.avatar);
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

    const handleChangeImage = async (e) => {
        if (window.confirm('사진을 수정하시겠습니까?')) {
            const formData = new FormData();
            formData.append('img', e.target.files[0]);
            const res = await axios.post('/user/addImg', formData);
            if (res.data) {
                alert('사진 수정이 완료되었습니다!')
                window.location.reload();
            }
        }
    }

    const handleDeleteImage = async () => {
        if (window.confirm('사진을 삭제하시겠습니까?')) {
            const res = await axios.get('/user/delImg');
            if (res.data) {
                alert('사진 삭제가 완료되었습니다!')
                window.location.reload();
            }
        }
    }

    const handleSubmitProfile = async () => {
        const nameCheck = /^[가-힣]{2,10}$/; // 이름 *한글 2~10자
        const emailCheck = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 정규표현식
        const phoneCheck = /^[0-9]{2,11}$/; // 숫자 2~11자

        // 이름 체크
        if (!nameCheck.test(name)) {
            return alert("이름은 한글로 시작하는 2~10자여야만 합니다.")
        } else if (!emailCheck.test(email)) {
            return alert("잘못된 이메일 형식입니다.")
        } else if (!phoneCheck.test(phone)) {
            return alert("전화번호는 하이픈(-) 없이 2~11자여야만 합니다.")
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
        if (res.data) {
            getProfile();
            alert("프로필 수정이 완료되었습니다!");
            window.location.reload();
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
                        userId={userId}
                        name={_name}
                        mento={mento}
                        avatar={avatar}
                        handleChangeImage={handleChangeImage}
                        handleDeleteImage={handleDeleteImage}
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