import React, { useEffect, useState, useContext, useCallback, lazy } from 'react';
import { fetchContext } from "../../contexts/fetch.context";
import { LoginStatusContext } from '../../contexts/login.context';
import { CarTree } from './car.tree';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { carDefinitionContext } from './car.definition.context';

const DefinitionDetails = styled.div`
    width: 100%;
`;

const DefinitionContent = styled(CardContent)`
    display: flex;
    &.MuiCardContent-root, .MuiCard-root {
        padding-left: 0;
        padding-right: 0;
        width: 100%;
    }
`;

const DefinitionContainer = styled.div`
    max-width: 90%;
    margin: 16px auto;
    /* display: flex;
    flex: 1 auto; */
`;


export default function ManufacturerListPage() {
    const manufacturerContext = useContext(carDefinitionContext);

    useEffect(() => {
        manufacturerContext.loadManufactureList('');
    }, []);
    return <div>no no {manufacturerContext.totalCount}</div>;
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
