import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginStatusContext } from '../contexts/login.context';
import { useHistory } from 'react-router';

const TitleElement = styled(Typography)`
    flex-grow: 1;
`;

const RootElement = styled.div`
    flex-grow: 1;
`;

const LinkButton = styled(Link)`
    * {
        color: #FFF;
    }

    color: #FFF;
    text-decoration: none;
`;

export default function ButtonAppBar() {
    const { isLoggedIn, logOutAction } = useContext(LoginStatusContext);
    const history = useHistory();

    return (
        <RootElement>
            <AppBar position="static">
                <Toolbar>
                    <TitleElement variant="h6">
                        <LinkButton to='/'>
                            Start Portal
                    </LinkButton>
                    </TitleElement>
                    {
                        !isLoggedIn ? (
                            <LinkButton to='/login'>
                                <Button>
                                    Zaloguj
                                </Button>
                            </LinkButton>
                        ) : (
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        logOutAction();
                                        history.push('/login');
                                    }}>
                                    Wyloguj
                                </Button>
                            )
                    }
                </Toolbar>
            </AppBar>
        </RootElement>
    );
}
