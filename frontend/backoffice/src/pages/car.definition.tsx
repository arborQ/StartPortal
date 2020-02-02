import React, { useEffect, useState, useContext } from 'react';
import { fetchContext  } from "../contexts/fetch.context";
import { LoginStatusContext } from '../contexts/login.context';

interface ICarDefinitionResponse {
    brands: string[];
}

export default function CarDefinitionPage() {
    const fetch = useContext(fetchContext);
    const { isLoggedIn } = useContext(LoginStatusContext);
    const [ brands, updateBrands ] = useState<string[]>([]);

    useEffect(() => {
        if (isLoggedIn) {
            fetch.get<ICarDefinitionResponse>('/api/cars')
            .then((cars) => updateBrands(cars.brands));
        }
    }, [ isLoggedIn ]);
    return (
        <div>{brands.join(', ')}</div>
    );
}
