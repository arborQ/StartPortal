import React, { useState, createContext } from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const NotificationProviderContainer = styled.div`

`;

export interface IMessage {
    text: string;
    duration?: number;
}

export type Message = IMessage | string;

function getMessage(message: Message): string {
    return typeof message === 'string' ? message : message.text;
}

function getDuration(message: Message): number | undefined {
    return typeof message === 'string' ? 60000 : message?.duration;
}

export const NotificationContext = createContext({
    showMessage: (message: Message) => alert(getMessage(message))
});

export function NotificationProvider({ children }: { children: React.ReactFragment }) {
    const [notificationMessage, changeMessage] = useState<IMessage | null>(null);
    function showMessage(message: Message) {
        changeMessage({
            text: getMessage(message),
            duration: getDuration(message)
        });
    }

    return (
        <NotificationProviderContainer>
            <NotificationContext.Provider value={{ showMessage }}>
                {children}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={!!notificationMessage}
                    autoHideDuration={notificationMessage?.duration}
                    onClose={() => { changeMessage(null) }}
                    message={notificationMessage?.text}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => changeMessage(null)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </NotificationContext.Provider>
        </NotificationProviderContainer>
    );
}
