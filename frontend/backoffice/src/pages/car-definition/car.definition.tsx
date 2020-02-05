import React, { useEffect, useState, useContext, useCallback } from 'react';
import { fetchContext } from "../../contexts/fetch.context";
import { LoginStatusContext } from '../../contexts/login.context';
import { CarTree } from './car.tree';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const DefinitionDetails = styled.div``;

const DefinitionContent = styled(CardContent)`
    display: flex;
    &.MuiCardContent-root {
        padding-left: 0;
        padding-right: 0;
    }
`;

const DefinitionContainer = styled.div`
    max-width: 90%;
    min-width: 600px;
    margin: 16px auto;
    display: flex;
    flex: 1 auto;
`;


export default function CarDefinitionPage() {
    const fetch = useContext(fetchContext);
    const { isLoggedIn } = useContext(LoginStatusContext);
    const [brands, updateBrands] = useState<StartPortal.Car.ICarBrand[]>([]);
    const [totalCount, updateTotalCount] = useState<number>(0);
    const { path } = useRouteMatch();

    const searchBrands = useCallback(async (search: string) => {
        const cars = await fetch.get<StartPortal.Car.ICarDefinitionResponse>(`/api/cars?search=${search}`);
        if (!cars.err) {
            updateBrands(cars.brands);
            updateTotalCount(cars.totalCount);
        }
    }, [fetch]);

    useEffect(() => {
        if (isLoggedIn) {
            searchBrands('');
        }
    }, [isLoggedIn, searchBrands]);

    return (
        <DefinitionContainer>
            <Card>
                <DefinitionContent>
                    <CarTree onSearch={searchBrands} totalCount={totalCount} brands={brands} onAddBrand={() => {
                        updateBrands([
                            ...brands, { id: `temp_id_${brands.length}`, name: `new_${brands.length}` }
                        ])
                    }} />
                </DefinitionContent>
            </Card>
            <Card style={{width: '100%', marginLeft: 16}}>
                <CardContent>
                    <DefinitionDetails>
                        <Switch>
                            <Route path={`${path}/add`} component={() => <div>add brand</div>} />
                            <Route path={`${path}/edit/:id`} component={() => <div>selected</div>} />
                            <Route path="/" component={() => <div>select something</div>} />
                        </Switch>
                    </DefinitionDetails>
                </CardContent>
            </Card>
        </DefinitionContainer>
    );
}
