import React, { useEffect, useState, useContext, useCallback } from 'react';
import { fetchContext  } from "../../contexts/fetch.context";
import { LoginStatusContext } from '../../contexts/login.context';
import { CarTree } from './car.tree';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const DefinitionDetails = styled.div``;

const DefinitionContent = styled(CardContent)`
    display: flex;
    &.MuiCardContent-root {
        padding-left: 0;
    }
`;

const DefinitionCard = styled(Card)`
    max-width: 90%;
    margin: 16px auto;
`;


export default function CarDefinitionPage() {
    const fetch = useContext(fetchContext);
    const { isLoggedIn } = useContext(LoginStatusContext);
    const [ brands, updateBrands ] = useState<StartPortal.Car.ICarBrand[]>([]);
    const [ totalCount, updateTotalCount ] = useState<number>(0);

    const searchBrands = useCallback(async (search: string) => {
        const cars = await fetch.get<StartPortal.Car.ICarDefinitionResponse>(`/api/cars?search=${search}`);
        if (!cars.err) {
            console.log({cars});
            updateBrands(cars?.brands && []);
            updateTotalCount(cars?.totalCount && 0);
        }
    }, [ fetch ]);

    // async function searchBrands(search: string) {
    //     const cars = await fetch.get<StartPortal.Car.ICarDefinitionResponse>(`/api/cars?search=${search}`);
    //     updateBrands(cars.brands);
    //     updateTotalCount(cars.totalCount);
    // }

    useEffect(() => {
        if (isLoggedIn) {
            searchBrands('');
        }
    }, [ isLoggedIn, searchBrands ]);

    return (
        <DefinitionCard>
            <DefinitionContent>
                <CarTree onSearch={searchBrands} totalCount={totalCount} brands={brands} onAddBrand={() => {
                    updateBrands([
                        ...brands, { id: `temp_id_${brands.length}`, name: `new_${brands.length}` }
                    ])
                }} />
                <DefinitionDetails>
                    details
                </DefinitionDetails>
            </DefinitionContent>
        </DefinitionCard>
    );
}
