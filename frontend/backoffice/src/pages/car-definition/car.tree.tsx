import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardTravel from '@material-ui/icons/CardTravel';
import PlusOne from '@material-ui/icons/PlusOne';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const NavigationLink = styled(NavLink)`
    color: #333;
    text-decoration: none;

    &.active {
        * {
            font-weight: bold;
        }
    }
`;
interface ICarTreeProps {
    brands: StartPortal.Car.ICarBrand[];
    totalCount: number;
    onAddBrand: () => void;
}

export function CarTree(props: ICarTreeProps) {
    const { brands, totalCount, onAddBrand } = props;
    const [ search, changeSearch ] = useState('Toy');
    const topLevelItems = brands.map((b) => (
        <NavigationLink activeClassName='active' to={`/definition/${b.id}`} key={b.id}>
            <ListItem button>
                <ListItemIcon>
                    <CardTravel />
                </ListItemIcon>
                <ListItemText primary={b.name} />
            </ListItem>
        </NavigationLink>
    ));

    return (
        <div>
            <TextField 
            style={{ width: '100%' }} 
            onChange={(e) => changeSearch(e.target.value)} 
            value={search} 
            label={`Szukaj (${brands.length}/${totalCount})`} />
            <List>
                {topLevelItems}
                <ListItem button onClick={() => onAddBrand()}>
                    <ListItemIcon>
                        <PlusOne />
                    </ListItemIcon>
                    <ListItemText primary={'Dodaj'} />
                </ListItem>
            </List>
        </div>
    );
}
