import React, { useEffect, useState, useContext, useCallback, lazy } from 'react';
import { fetchContext } from "../../contexts/fetch.context";
import { LoginStatusContext } from '../../contexts/login.context';
import { CarTree } from './car.tree';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { carDefinitionContext } from './car.definition.context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';

const ListHeader = styled(ListSubheader)`
    width: 100%;
    &.MuiListSubheader-root{
        background-color: #FFF;
    }
`;

const CardList = styled(Paper).attrs({ elevation: 3 })`
    max-width: 90%;
    margin: 16px auto;
`;

export default function ManufacturerListPage() {
    const { list, loadManufactureList } = useContext(carDefinitionContext);

    useEffect(() => {
        loadManufactureList('');
    }, []);

    return (
        <CardList>
            <List>
                <ListHeader>
                    <TextField />
                </ListHeader>
                {
                    list.map((m) => (
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    {m.name.substring(0, 1).toUpperCase()} 
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={m.name} secondary={m.name} />
                        </ListItem>
                    ))
                }
            </List>
        </CardList>
    );
    // const fetch = useContext(fetchContext);
    // const { isLoggedIn } = useContext(LoginStatusContext);
    // const [brands, updateBrands] = useState<StartPortal.Car.ICarBrand[]>([]);
    // const [totalCount, updateTotalCount] = useState<number>(0);
    // const { path, isExact } = useRouteMatch();

    // const searchBrands = useCallback(async (search: string) => {
    //     const cars = await fetch.get<StartPortal.Car.ICarDefinitionResponse>(`/api/brands?search=${search}`);
    //     if (!cars.err) {
    //         updateBrands(cars.brands);
    //         updateTotalCount(cars.totalCount);
    //     }
    // }, [fetch]);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         searchBrands('');
    //     }
    // }, [isLoggedIn, searchBrands, isExact]);

    // return (
    //     <DefinitionContainer>
    //         <DefinitionContent>
    //             <Card>
    //                 <CarTree 
    //                     onSearch={searchBrands} 
    //                     totalCount={totalCount} 
    //                     brands={brands} 
    //                     onAddBrand={() => {

    //                     }} 
    //                 />
    //             </Card>
    //         </DefinitionContent>
    //         <DefinitionDetails>
    //             <Switch>
    //                 <Route path={`${path}/add`} component={lazy(() => import('./manufacturer.add'))} />
    //                 <Route path={`${path}/edit/:id`} component={lazy(() => import('./manufacturer.edit'))} />
    //             </Switch>
    //         </DefinitionDetails>
    //     </DefinitionContainer>
    // );
}
