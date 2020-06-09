import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
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
    const {_name, _mento, _email, _phone, _state} = props;

    const [name, setName] = useState('');
    const [mento, setMento] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');


    const handleChange = e => {
        setName(e.target.value);
    };

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

    useEffect(() => {
        setName(_name);
    })

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
                                required
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
                                onChange={handleChange}
                                required
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
                                label="전화번호"
                                margin="dense"
                                name="phone"
                                onChange={handleChange}
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
                                label="지역"
                                margin="dense"
                                name="state"
                                onChange={handleChange}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{native: true}}
                                value={state}
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
