import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { fetchContext } from '../../contexts/fetch.context';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function ManufacturerAddPage() {
    const history = useHistory();
    const { id } = useParams();
    const fetch = useContext(fetchContext);

    function onClose() {
        history.replace('/definition');
    }
    return (
        <Card style={{ width: '100%', marginLeft: 16 }}>
            <CardContent>
                <Formik
                    initialValues={{ name: id }}
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
                                <div>
                                    {id}
                                </div>
                                <Button onClick={onClose} color="primary">
                                    Cancel
                                </Button>
                                <Button disabled={!isValid} type="submit" color="primary">
                                    Add
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            </CardContent>
        </Card>
    );
}