import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

export enum FuelType {
    Any = 0,
    Diesel = 1 << 0,
    Petrol = 1 << 1,
    Gaz = 1 << 2,
    CNG = 1 << 3,
    Electric = 1 << 4,
    Hybrid = 1 << 5,
    All = ~(~0 << 6)
}

interface IFuelTypeComponentProps {
    fuelType: FuelType;
    onChange: (newType: FuelType) => void;
}

export function FuelTypeComponent({ fuelType, onChange }: IFuelTypeComponentProps) {
    const options = [
        { name: 'Diesel', type: FuelType.Diesel },
        { name: 'Benzyna', type: FuelType.Petrol },
        { name: 'LPG', type: FuelType.Gaz },
        { name: 'CNG', type: FuelType.CNG },
        { name: 'Elektryczny', type: FuelType.Electric },
        { name: 'Hybryda', type: FuelType.Hybrid },
        { name: 'WSZYSTKIE', type: FuelType.All },
    ];

    return (
        <FormControl required component="fieldset">
            <FormLabel component="legend">Wybierz rodzaj paliwa</FormLabel>
            <FormGroup>
                {
                    options.map((o) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={o.type === (fuelType & o.type)}
                                    onChange={() => {
                                        if (o.type !== (fuelType & o.type)) {
                                            onChange(fuelType | o.type);
                                        } else {
                                            onChange(fuelType & ~o.type);
                                        }
                                    }}
                                    value={o.type} />
                            }
                            label={o.name}
                        />
                    ))
                }

            </FormGroup>
            {/* <FormHelperText>You can display an error</FormHelperText> */}
        </FormControl>
    );
}
