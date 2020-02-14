import React, { useEffect, useContext } from 'react';
import parseJwt from 'jwt-decode';
import { useHistory } from 'react-router';
import { NotificationContext } from './notification.context';

export interface ILoginState {
    firstName: string;
    lastName: string;
    token?: string;
}

export interface ILoginStatusContext {
    readonly isLoggedIn: boolean;
    loginData: ILoginState | null;
    logInAction: (newState: ILoginState) => void;
    logOutAction: () => void;
}

export const LoginStatusContext = React.createContext<ILoginStatusContext>({
    loginData: null,
    isLoggedIn: false,
    logInAction: (newState: ILoginState) => { /* do nothing */ },
    logOutAction: () => { /* do nothing */ },
});

const Provider = LoginStatusContext.Provider;
export interface ISessionProvider<T extends ILoginState = ILoginState> {
    getSession(): T | null;
    setSession(state: T): Promise<void | any>;
    clearSession(): Promise<void | any>;
}

interface ILoginStatusProviderProps {
    children: React.ReactFragment;
    provider?: ISessionProvider;
}

export function LoginStatusProvider(props: ILoginStatusProviderProps) {
    const { children, provider } = props;
    const session = provider?.getSession();
    const history = useHistory();
    const notification = useContext(NotificationContext);

    const [loginStatusState, changeLoginStatusState] = React.useState<{
        loginData: ILoginState | null;
        isLoggedIn: boolean;
    }>({
        loginData: session ? session : null,
        isLoggedIn: !!session,
    });

    const { loginData, isLoggedIn } = loginStatusState;

    async function logOutAction() {
        notification.showMessage('Zostałeś wylogowany.');
        await provider?.clearSession();
        changeLoginStatusState({
            isLoggedIn: false,
            loginData: null,
        });
    };

    useEffect(() => {
        if (session?.token) {
            const payload = parseJwt<{ exp: number }>(session?.token);
            const expireDate = new Date(payload.exp * 1000);
            const timeLeft = (expireDate.getTime() - new Date().getTime());
            const timeOutKey = setTimeout(() => { 
                logOutAction();
                setTimeout(() => {
                    notification.showMessage('Wygasła sesja! Zostałeś wylogowany.');
                    history.push('/login');
                });
            }, timeLeft);

            return () => clearTimeout(timeOutKey);
        }
    }, [isLoggedIn]);

    return (
        <Provider
            value={{
                loginData,
                isLoggedIn,
                logOutAction,
                logInAction: async (newState: ILoginState) => {
                    await provider?.setSession(newState);
                    changeLoginStatusState({
                        isLoggedIn: !!newState,
                        loginData: newState,
                    });
                },
            }}
        >
            {children}
        </Provider>
    );
}
