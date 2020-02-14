import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { carDefinitionContext } from './car.definition.context';
import { SpeedDialComponent } from '../../components/speedDial/speedDial.component';
import AddIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import { FuelTypeComponent, FuelType } from './components/fuel.type.component';

export default function ManufacturerAddPage() {
    const history = useHistory();
    const { id } = useParams();
    const { getManufactureDetails, editManufacturer, deleteManufacturer } = useContext(carDefinitionContext);
    const [ fuel, changeFuel] = useState(FuelType.Diesel | FuelType.Petrol);
    const [manufacturer, updateManufacturer] = useState<StartPortal.Car.IManufacturerDetails>({ id: '', name: '' });

    useEffect(() => {
        if (id) {
            const abortController = new AbortController();
            getManufactureDetails(id, abortController.signal).then(updateManufacturer);

            return () => abortController.abort();
        }
    }, [id]);

    if (!manufacturer.id) {
        return null;
    }

    return (
        <Card style={{ width: '100%', marginLeft: 16 }}>
            <Formik
                initialValues={manufacturer}
                onSubmit={editManufacturer}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required('Nazwa producenta jest wymagana').max(100, "Maksymalnie 100 znaków"),
                    })
                }
            >
                {
                    ({ values, setFieldValue, errors }) => (
                        <Form>
                            <CardHeader title={!!(values.name.trim()) ? values.name: 'Wpisz nazwę!'} subheader={'Edytuj dane producenta'}></CardHeader>
                            <CardContent>
                                <div>
                                    <TextField 
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        label={'Nazwa producenta'} 
                                        onChange={(e) => setFieldValue('name', e.target.value)} 
                                        value={values.name} 
                                    />
                                </div>
                                <div>
                                    <FuelTypeComponent onChange={changeFuel} fuelType={fuel} />
                                </div>
                            </CardContent>
                            <SpeedDialComponent actions={[
                            {
                                name: 'Zapisz',
                                onClick: async () => {
                                    await editManufacturer(values);
                                },
                                icon: <SaveIcon />
                            },
                            {
                                name: 'Anuluj',
                                onClick: () => history.replace('/definition'),
                                icon: <CancelIcon />
                            },
                            {
                                name: 'Dodaj model',
                                onClick: () => {
                                },
                                icon: <AddIcon />
                            },
                            {
                                name: 'Usuń producenta',
                                onClick: async () => {
                                    history.replace('/definition')
                                    deleteManufacturer(values.id);
                                },
                                icon: <RemoveIcon />
                            }
                        ]} />
                        </Form>
                    )
                }
            </Formik>
        </Card>
    );
}