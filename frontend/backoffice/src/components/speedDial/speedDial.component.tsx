import React, { useState } from 'react';
import { SpeedDialContainer } from './speedDial.component.styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

interface ISpeedDialAction {
    name: string;
    onClick: () => void;
    icon: JSX.Element;
}

interface ISpeedDialContainerProps {
    actions: ISpeedDialAction[]
}

export function SpeedDialComponent(props: ISpeedDialContainerProps) {
    const { actions } = props;
    const [isOpen, switchIsOpen] = useState(false);
    return (
        <SpeedDialContainer>
            <SpeedDial
                icon={<SpeedDialIcon />}
                ariaLabel='speed dial'
                direction="up" open={isOpen}
                onOpen={() => switchIsOpen(true)}
                onClose={() => switchIsOpen(false)}
            >
                {
                    actions.map((a) => (
                        <SpeedDialAction
                            key={a.name}
                            tooltipOpen
                            tooltipTitle={a.name}
                            icon={a.icon}
                            onClick={a.onClick}
                        />
                    ))
                }
            </SpeedDial>
        </SpeedDialContainer>
    );
}
