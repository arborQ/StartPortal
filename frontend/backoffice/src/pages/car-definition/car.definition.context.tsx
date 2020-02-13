import React, { createContext, useContext, lazy, useState, useEffect, Suspense } from 'react';
import { fetchContext } from '../../contexts/fetch.context';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import ManufacturerDefinitionList from './manufacturer.list';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DetailsContainer, ListDetailsContainer } from './car.definition.styles';
import { SpeedDialComponent } from '../../components/speedDial/speedDial.component';
import AddIcon from '@material-ui/icons/AddCircle';

interface ICarDefinitionContextState {
    isLoading: boolean;
    search: string;
    list: StartPortal.Car.IManufacturer[];
    totalCount: number;
}

interface ICarDefinitionContext extends ICarDefinitionContextState {
    loadManufactureList: (search: string) => Promise<StartPortal.Car.IIManufacturerResponse>;
    addManufacturer: (name: string) => Promise<StartPortal.Car.IManufacturer>;
    editManufacturer: (update: Partial<StartPortal.Car.IManufacturer>) => Promise<StartPortal.Car.IManufacturer>;
    deleteManufacturer: (id: string) => Promise<void>;
    getManufactureDetails: (id: string, signal?: AbortSignal) => Promise<StartPortal.Car.IManufacturerDetails>;
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
    addManufacturer: () => Promise.resolve({ id: '', name: '' }),
    editManufacturer: (update: Partial<StartPortal.Car.IManufacturer>) => Promise.resolve({ id: '', name: '' }),
    deleteManufacturer: (id: string) => Promise.resolve(),
    getManufactureDetails: (id: string) => Promise.resolve({ id: '', name: '' }),
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

    async function editManufacturer(update: Partial<StartPortal.Car.IManufacturer>) {
        updateResponseState({
            ...responseState,
            list: [
                ...responseState.list.map((l) => {
                    if (l.id === update.id) {
                        return { ...l, ...update };
                    }
                    return l;
                })
            ]
        });
        return await fetch.put<StartPortal.Car.IManufacturer>(`${api}/${update.id}`, { model: update });
    }

    async function getManufactureDetails(id: string, signal?: AbortSignal): Promise<StartPortal.Car.IManufacturerDetails> {
        const data = await fetch.get<StartPortal.Car.IManufacturerDetails>(`${api}/${id}`, { signal });

        return data;
    }

    async function addManufacturer(name: string) {
        const data = await fetch.post<StartPortal.Car.IManufacturer>(api, { name });
        updateResponseState({
            ...responseState,
            totalCount: responseState.totalCount + 1,
            list: [
                ...responseState.list,
                data
            ]
        });

        return data;
    }

    async function deleteManufacturer(id: string) {
        updateResponseState({
            ...responseState,
            totalCount: responseState.totalCount - 1,
            list: [
                ...responseState.list.filter((l) => l.id !== id)
            ]
        });
        return await fetch.delete<void>(`${api}/${id}`);
    }

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
            loadManufactureList,
            getManufactureDetails,
            editManufacturer,
            deleteManufacturer,
            addManufacturer
        }}>
            {children}
        </Provider>
    );
}

export default function CarDefinitionRoutes() {
    const { path, isExact } = useRouteMatch();
    const history = useHistory();

    return (
        <CarDefinitionProvider api='/api/manufacturers'>
            <ListDetailsContainer isExact={isExact}>
                <ManufacturerDefinitionList />
                {
                    !isExact && (

                        <DetailsContainer>
                            <Suspense fallback={<CircularProgress style={{ margin: '0 auto' }} />} >
                                <Switch>
                                    <Route path={`${path}/add`} component={lazy(() => import('./manufacturer.add'))} />
                                    <Route path={`${path}/edit/:id`} component={lazy(() => import('./manufacturer.edit'))} />
                                </Switch>
                            </Suspense>
                        </DetailsContainer>
                    )
                }
                {
                    isExact && (
                        <SpeedDialComponent actions={[
                            {
                                name: 'Dodaj producenta',
                                onClick: () => history.push(`${path}/add`),
                                icon: <AddIcon />
                            }
                        ]} />
                    )
                }
            </ListDetailsContainer>
        </CarDefinitionProvider>
    );
}
