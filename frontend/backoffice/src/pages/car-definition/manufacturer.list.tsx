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
                    <TextField
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                const [ first ] = list;
                                if (first) {
                                    history.push(`/definition/edit/${first.id}`);
                                }
                            }
                        }}
                        autoFocus
                        label={`Szukaj ${list.length}/${totalCount}`}
                        value={search}
                        onChange={(e) => loadManufactureList(e.target.value)}
                    />
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
}
