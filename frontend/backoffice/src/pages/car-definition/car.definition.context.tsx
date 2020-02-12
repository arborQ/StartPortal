import React, { createContext, useContext, lazy, useState } from 'react';
import { fetchContext } from '../../contexts/fetch.context';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

interface ICarDefinitionContextState {
    list: StartPortal.Car.IManufacturer[];
    totalCount: number;
}

interface ICarDefinitionContext extends ICarDefinitionContextState {
    loadManufactureList: (search: string) => Promise<StartPortal.Car.IIManufacturerResponse>;
    addManufacturer: () => Promise<string>;
    editManufacturer: (update: Partial<StartPortal.Car.IManufacturer>) => Promise<StartPortal.Car.IManufacturer>;
    deleteManufacturer: (id: string) => Promise<void>;
}

const defaultContext: ICarDefinitionContext = {
    list: [],
    totalCount: 0,
    loadManufactureList: (search: string) => Promise.resolve<StartPortal.Car.IIManufacturerResponse>({ brands: [], totalCount: 0 }),
    addManufacturer: () => Promise.resolve(''),
    editManufacturer: (update: Partial<StartPortal.Car.IManufacturer>) => Promise.resolve({ id: '', name: '' }),
    deleteManufacturer: (id: string) => Promise.resolve()
};

export const carDefinitionContext = createContext<ICarDefinitionContext>(defaultContext);

const Provider = carDefinitionContext.Provider;

export function CarDefinitionProvider({ children, api }: { children: React.ReactFragment, api: string }) {
    const fetch = useContext(fetchContext);
    const [responseState, updateResponseState] = useState<ICarDefinitionContextState>({
        list: [],
        totalCount: 0
    })
    async function loadManufactureList(search: string) {
        const response = await fetch.get<StartPortal.Car.IIManufacturerResponse>(`${api}?search=${search}`);
        updateResponseState({
            list: response.brands, totalCount: response.totalCount
        })
        return response;
    }

    return (
        <Provider value={{ 
                ...defaultContext, 
                ...responseState, 
                loadManufactureList
             }}>
            {children}
        </Provider>
    );
}

export default function CarDefinitionRoutes() {
    const { path } = useRouteMatch();
    return (
        <CarDefinitionProvider api='/api/brands'>
            <Switch>
                <Route path={`${path}`} exact component={lazy(() => import('./manufacturer.list'))} />
                <Route path={`${path}/add`} component={lazy(() => import('./manufacturer.add'))} />
                <Route path={`${path}/edit/:id`} component={lazy(() => import('./manufacturer.edit'))} />
            </Switch>
        </CarDefinitionProvider>
    );
}
