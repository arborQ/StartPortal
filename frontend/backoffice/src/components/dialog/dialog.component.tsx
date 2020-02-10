import React from 'react';
import { DialogContainer } from './dialog.component.styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

interface IDialogContainerProps {
    title?: string;
    children?: React.ReactFragment;
    isOpen: boolean;
    onClose: () => void;
    actions?: React.ReactFragment;
}

export function DialogComponent(props: IDialogContainerProps) {
    const { actions, onClose, isOpen, title, children } = props;

    return (
        <DialogContainer>
            <Dialog onClose={onClose} open={isOpen}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                {actions}
                </DialogActions>
            </Dialog>
        </DialogContainer>
    );
}
