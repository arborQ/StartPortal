import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { fetchContext } from '../../contexts/fetch.context';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { carDefinitionContext } from './car.definition.context';
import { SpeedDialComponent } from '../../components/speedDial/speedDial.component';
import AddIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/CancelOutlined';

export default function ManufacturerAddPage() {
    const history = useHistory();
    const { id } = useParams();
    const fetch = useContext(fetchContext);
    const { getManufactureDetails, editManufacturer } = useContext(carDefinitionContext);

    const [manufacturer, updateManufacturer] = useState<StartPortal.Car.IManufacturerDetails>({ id: '', name: '' });
    function onClose() {
        history.replace('/definition');
    }

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
                onSubmit={async (values) => {
                    console.log(values);
                    const { id } = await fetch.post('/api/brands', { name: values.name });
                    history.replace(`/definition/edit/${id}`);
                }}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required('Nazwa producenta jest wymagana').max(100, "Maksymalnie 100 znaków"),
                    })
                }
            >
                {
                    ({ values, setFieldValue, isSubmitting, errors, isValid }) => (
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
                                onClick: () => {},
                                icon: <AddIcon />
                            }
                        ]} />
                        </Form>
                    )
                }
            </Formik>
        </Card>
    );
}