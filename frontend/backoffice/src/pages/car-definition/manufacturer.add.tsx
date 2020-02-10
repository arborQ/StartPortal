import React from 'react';
import { DialogComponent } from '../../components/dialog/dialog.component';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { fetchContext } from '../contexts/fetch.context';

export default function ManufacturerAddPage() {
    const history = useHistory();
    const fetch = useContext(fetchContext);

    function onClose() {
        history.replace('/definition');
    }
    return (
        <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values) => {
                fetch.post('/api/manufacturers', { name: values.name });
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
                        <DialogComponent
                            title="Dodaj nowego producenta"
                            isOpen
                            onClose={onClose}
                            actions={(
                                <>
                                    <Button onClick={onClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button disabled={!isValid} type="submit" color="primary">
                                        Add
                                    </Button>
                                </>
                            )}
                            >
                            <div>
                                <TextField 
                                    autoFocus  
                                    label="Nazwa producenta" 
                                    variant="outlined" 
                                    value={values.name} 
                                    onChange={(e) => setFieldValue('name', e.target.value)} 
                                    disabled={isSubmitting}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </div>
                        </DialogComponent>
                    </Form>
                )
            }
        </Formik>
    );
}