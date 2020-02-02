import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const IconButtonElement = styled(IconButton)`
    margin-right: 16px;
`;

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
    return (
        <RootElement>
            <AppBar position="static">
                <Toolbar>
                        <TitleElement variant="h6">
                    <LinkButton to='/'>
                            Start Portal
                    </LinkButton>
                        </TitleElement>
                    <LinkButton to='/login'>
                        <Button>
                            Login
                        </Button>
                    </LinkButton>
                </Toolbar>
            </AppBar>
        </RootElement>
    );
}
