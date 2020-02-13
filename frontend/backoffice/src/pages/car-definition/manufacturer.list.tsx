import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { carDefinitionContext } from './car.definition.context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { CardList, ListHeader } from './car.definition.styles';

export default function ManufacturerListPage() {
    const { list, loadManufactureList, search, totalCount } = useContext(carDefinitionContext);
    const history = useHistory();

    useEffect(() => {
        loadManufactureList('');
    }, []);

    return (
        <CardList>
            <List>
                <ListHeader>
                    <TextField autoFocus label={`Szukaj ${list.length}/${totalCount}`} value={search} onChange={(e) => loadManufactureList(e.target.value)} />
                </ListHeader>
                {
                    list.map((m) => (
                        <ListItem button key={m.id} onClick={() => history.push(`/definition/edit/${m.id}`)}>
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
