import React, { useContext } from 'react';
import { LoginStatusContext } from '../contexts/login.context';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const HomePageContainer = styled.div`
    margin: 16px auto;
    max-width: 400px;

    a {
        text-decoration: none;
    }
`;

export default function HomePage() {
    const { isLoggedIn } = useContext(LoginStatusContext);

    if (!isLoggedIn) {
        return (
            <HomePageContainer>
                <Card>
                    <CardHeader title="Kim ty jesteś?" subheader="Weź się zaloguj">

                    </CardHeader>
                    <CardActions>
                        <Link to="/login">
                            <Button variant="contained" color="primary">
                                Weź się zaloguj
                        </Button>
                        </Link>
                    </CardActions>
                </Card>
            </HomePageContainer>
        )
    }

    return (
        <HomePageContainer>
                <Card>
                    <CardHeader title="Co tu można robić?" subheader="Witaj w backoffice :)">

                    </CardHeader>
                    <CardActions>
                        <Link to="/definition">
                            <Button variant="contained">
                                Zobacz definicje samochodów
                        </Button>
                        </Link>
                    </CardActions>
                </Card>
            </HomePageContainer>
    );
}