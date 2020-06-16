import React, {useEffect, useState} from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    TextField,
    CardContent,
    Grid,
    Divider,
    Button,

} from '@material-ui/core';
import PropTypes from "prop-types";

const ProfileDetailsItem = props => {
    const {name, email, phone, state,
        handleChangeName, handleChangeEmail, handleChangePhone, handleChangeState,
        handleSubmitProfile} = props;

    const states = [
        {
            value: '서울',
        },
        {
            value: '경기',
        },
        {
            value: '강원',
        },
        {
            value: '충북',
        },
        {
            value: '충남',
        },
        {
            value: '경북',
        },
        {
            value: '경남',
        },
        {
            value: '전북',
        },
        {
            value: '전남',
        },
        {
            value: '제주',
        },
    ];

    return (
        <Card elevation={2}>
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                    subheader="프로필 수정"
                    title="프로필"
                />
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="2글자 이상 10글자 이하의 한글"
                                label="이름"
                                margin="dense"
                                name="name"
                                onChange={handleChangeName}
                                value={name}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="이메일"
                                margin="dense"
                                name="email"
                                onChange={handleChangeEmail}
                                value={email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="하이픈(-) 없이 숫자 2~11자"
                                label="전화번호"
                                margin="dense"
                                name="phone"
                                onChange={handleChangePhone}
                                type="tel"
                                value={phone}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                margin="dense"
                                name="state"
                                onChange={handleChangeState}
                                value={state}
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{native: true}}
                                variant="outlined"
                            >
                                {states.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.value}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmitProfile}
                    >
                        저장하기
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

ProfileDetailsItem.propTypes = {
    name: PropTypes.string,
    mento: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
    handleChangeName: PropTypes.func,
    handleChangeEmail: PropTypes.func,
    handleChangePhone: PropTypes.func,
    handleChangeState: PropTypes.func,
    handleSubmitProfile: PropTypes.func,
}

export default ProfileDetailsItem;