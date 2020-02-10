import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { fetchContext } from '../../contexts/fetch.context';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

export default function ManufacturerAddPage() {
    const history = useHistory();
    const fetch = useContext(fetchContext);

    function onClose() {
        history.replace('/definition');
    }
    return (
        <Dialog
            open
            onClose={onClose}
        >
            <Formik
                initialValues={{ name: '' }}
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
                            <DialogContent>
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onClose} color="primary">
                                    Cancel
                                </Button>
                                <Button disabled={!isValid} type="submit" color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Form>
                    )
                }
            </Formik>
        </Dialog>
    );
}