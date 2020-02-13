import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';

export const ListHeader = styled(ListSubheader)`
    width: 100%;
    &.MuiListSubheader-root{
        background-color: #FFF;
    }
`;

export const CardList = styled(Paper).attrs({ elevation: 3 })`
    width: 100%;
    transition: width ease-out 0.4s;
    overflow-y: auto;
`;

export const DetailsContainer = styled.div`
    height: 100%;
    width: 100%;
    > .MuiPaper-root {
        height: 100%;
        position: relative;
        .MuiTextField-root {
            width: 100%;
        }

        .MuiCardActions-root {
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
`;

export const ListDetailsContainer = styled.div<{ isExact: boolean }>`
    max-width: 95%;
    margin: 16px auto;
    height: calc(100vh - 100px);
    display: flex;
    align-items: stretch;
    ${CardList} {
        width: ${(props) => props.isExact ? '100%': '250px'}
    }

    .MuiSpeedDial-root {
        position: fixed;
        bottom: 30px;
        right: 30px;
    }
`;