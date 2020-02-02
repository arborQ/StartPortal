import React from 'react';

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

    const [loginStatusState, changeLoginStatusState] = React.useState<{
        loginData: ILoginState | null;
        isLoggedIn: boolean;
    }>({
        loginData: session ? session : null,
        isLoggedIn: !!session,
    });

    const { loginData, isLoggedIn } = loginStatusState;
    return (
        <Provider
            value={{
                loginData,
                isLoggedIn,
                logInAction: async (newState: ILoginState) => {
                    await provider?.setSession(newState);
                    changeLoginStatusState({
                        isLoggedIn: !!newState,
                        loginData: newState,
                    });
                },
                logOutAction: async () => {
                    await provider?.clearSession();
                    changeLoginStatusState({
                        isLoggedIn: false,
                        loginData: null,
                    });
                },

            }}
        >
            {children}
        </Provider>
    );
}
