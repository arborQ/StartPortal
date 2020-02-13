import React, { createContext, useContext, lazy, useState, useEffect } from 'react';
import { fetchContext } from '../../contexts/fetch.context';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

interface ICarDefinitionContextState {
    isLoading: boolean;
    search: string;
    list: StartPortal.Car.IManufacturer[];
    totalCount: number;
}

interface ICarDefinitionContext extends ICarDefinitionContextState {
    loadManufactureList: (search: string) => Promise<StartPortal.Car.IIManufacturerResponse>;
    addManufacturer: () => Promise<string>;
    editManufacturer: (update: Partial<StartPortal.Car.IManufacturer>) => Promise<StartPortal.Car.IManufacturer>;
    deleteManufacturer: (id: string) => Promise<void>;
}

const defaultState: ICarDefinitionContextState = {
    isLoading: true,
    search: '',
    list: [],
    totalCount: 0
};

const defaultContext: ICarDefinitionContext = {
    ...defaultState,
    loadManufactureList: (search: string) => Promise.resolve<StartPortal.Car.IIManufacturerResponse>({ brands: [], totalCount: 0 }),
    addManufacturer: () => Promise.resolve(''),
    editManufacturer: (update: Partial<StartPortal.Car.IManufacturer>) => Promise.resolve({ id: '', name: '' }),
    deleteManufacturer: (id: string) => Promise.resolve()
};

export const carDefinitionContext = createContext<ICarDefinitionContext>(defaultContext);

const Provider = carDefinitionContext.Provider;
let abortController: AbortController | null = null;
export function CarDefinitionProvider({ children, api }: { children: React.ReactFragment, api: string }) {
    const fetch = useContext(fetchContext);
    const [responseState, updateResponseState] = useState<ICarDefinitionContextState>(defaultState);

    useEffect(() => {
        return () => abortController?.abort();
    }, []);

    async function loadManufactureList(search: string) {
        updateResponseState({
            ...responseState, search, isLoading: true
        });

        if (abortController) {
            abortController.abort();
        }
        abortController = new AbortController();
        const response = await fetch.get<StartPortal.Car.IIManufacturerResponse>(`${api}?search=${search}`, { signal: abortController.signal });
        updateResponseState({
            isLoading: false,
            list: response.brands,
            totalCount: response.totalCount,
            search
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
