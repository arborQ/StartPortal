import React from 'react';
import { ModelDefinitionContainer } from './modelDefinition.component.styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FuelTypeComponent } from '../fuel.type.component';
interface IModelDefinitionContainerProps {
    model?: Partial<StartPortal.Car.ICarModel>;
    show: boolean;
}

export function ModelDefinitionComponent(props: IModelDefinitionContainerProps) {
    const { model, show } = props;

    return (
        <ModelDefinitionContainer>
            <Dialog open={show}>
                <DialogTitle>{`${model?.name} (${model?.fromYear}-${model?.toYear})`}</DialogTitle>
                <DialogContent>
                    <TextField value={model?.name} label="Nazwa" />
                    <TextField value={model?.fromYear} label="Produkowany od" />
                    <TextField value={model?.toYear} label="Produkowany do" />
                    <FuelTypeComponent fuelType={7} onChange={() => {}} />
                </DialogContent>
                <DialogActions>
                    <Button>Anuluj</Button>
                    <Button>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </ModelDefinitionContainer>
    );
}
