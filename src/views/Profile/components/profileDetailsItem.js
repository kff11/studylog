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
    const {name, mento, email, phone, state} = props;

    const handleChange = e => {
    };

    const user = {
        name: name,
        mento: mento ? '멘토' : '학습자',
        email: email,
        phone: phone,
        state: state,
    }

    const states = [
        {
            value: '서울',
        },
        {
            value: '경기',
        },
        {
            value: '인천',
        }
    ];

    return (
        <Card>
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
                                onChange={handleChange}
                                value={user.name}
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
                                onChange={handleChange}
                                value={user.email}
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
                                label="전화번호"
                                margin="dense"
                                name="phone"
                                onChange={handleChange}
                                type="tel"
                                value={user.phone}
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
                                label="지역"
                                margin="dense"
                                name="state"
                                onChange={handleChange}
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{native: true}}
                                value={user.state}
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
}

export default ProfileDetailsItem;
