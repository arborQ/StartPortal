import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginStatusContext } from '../contexts/login.context';
import { fetchContext } from '../contexts/fetch.context';

const LoginContainer = styled(Card)`
    max-width: 90%;
    width: 450px;
    margin: 16px auto;
`;

const TextFieldContainerElement = styled(CardContent)`
    display: flex;
    flex-direction: column;
    .MuiTextField-root {
        margin-bottom: 16px;
    }
`;

export default function LoginPage() {
    const { logInAction, logOutAction, isLoggedIn, loginData } = useContext(LoginStatusContext);
    const fetch = useContext(fetchContext);

    if (isLoggedIn && loginData) {
        return (
            <LoginContainer>
                <CardHeader
                    title={`Jesteś już zalogowany`}
                    subheader={`${loginData.firstName} ${loginData.lastName}`}>
                </CardHeader>
                <CardActions disableSpacing>
                    <Button 
                    type="button" 
                    variant="contained" 
                    color="primary"
                    onClick={logOutAction}
                    >
                        Wyloguj
                    </Button>
                </CardActions>
            </LoginContainer>
        );
    }

    return (
        <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={async (values) => {
                const { login, password } = values;
                const loginData = await fetch.post('/api/login', { login, password });
                console.log({ loginData });
                // if (values.login === 'admin' && values.password === 'admin') {
                //     logInAction({
                //         firstName: 'admin',
                //         lastName: 'admin'
                //     });
                // }
            }}
            validationSchema={
                Yup.object({
                    login: Yup.string().required('Login wymagany'),
                    password: Yup.string().required('Hasło wymagane')
                })
            }
        >
            {
                ({ values, setFieldValue, isValid, errors, isSubmitting }) => (
                    <Form>
                        <LoginContainer>
                            <CardHeader
                                title="Logowanie"
                                subheader="Znasz hasło?">
                            </CardHeader>
                            <TextFieldContainerElement>
                                <TextField
                                    disabled={isSubmitting}
                                    error={!!errors.login}
                                    helperText={errors.login}
                                    label="Login"
                                    value={values.login}
                                    onChange={(e) => setFieldValue('login', e.target.value)}
                                />
                                <TextField
                                    disabled={isSubmitting}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    label="Hasło"
                                    type="password"
                                    value={values.password}
                                    onChange={(e) => setFieldValue('password', e.target.value)}
                                />
                            </TextFieldContainerElement>
                            <CardActions disableSpacing>
                                <Button disabled={!isValid || isSubmitting} type="submit" variant="contained" color="primary">
                                    Zaloguj
                            </Button>
                            </CardActions>
                        </LoginContainer>
                    </Form>
                )
            }
        </Formik>
    );
}
