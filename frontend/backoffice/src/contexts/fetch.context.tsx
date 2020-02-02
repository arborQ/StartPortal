import { LoginStatusContext } from './login.context';
import React, { createContext, useContext } from 'react';

export interface IFetchContext {
    defaultHeaders: (token?: string) => { [key: string]: string };
    post<T>(url: string, data?: any, requestInit?: RequestInit): Promise<T>;
    put<T>(url: string, data?: any, requestInit?: RequestInit): Promise<T>;
    get<T>(url: string, requestInit?: RequestInit): Promise<T>;

}

const authorizeKey = 'authorization';

class FetchContext implements IFetchContext {
    public constructor(private authorizeHeader?: string) { }

    public defaultHeaders(token: string | undefined = this.authorizeHeader) {
        return {
            'Content-Type': 'application/json',
            [authorizeKey]: token || '',
        };
    }

    public async post<T>(url: string, data?: any, requestInit?: RequestInit): Promise<T> {
        const defaultRequest = {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            headers: this.defaultHeaders(),
        };

        const response = await fetch(url, {
            ...defaultRequest,
            ...requestInit,
        });

        return await this.getResponseJson(response);
    }

    public async put<T>(url: string, data?: any, requestInit?: RequestInit): Promise<T> {
        const defaultRequest = {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            headers: this.defaultHeaders(),
        };

        const response = await fetch(url, {
            ...defaultRequest,
            ...requestInit,
        });

        return await this.getResponseJson<T>(response);
    }

    public async get<T>(url: string, requestInit?: RequestInit): Promise<T> {
        const defaultRequest = {
            method: 'GET',
            headers: this.defaultHeaders(),
        };

        const response = await fetch(url, {
            ...defaultRequest,
            ...requestInit,
        });

        return this.getResponseJson<T>(response);
    }

    private async getResponseJson<T>(response: Response): Promise<T> {
        try {
            return await response.json() as T;
        } catch {
            return {} as T;
        }
    }
}

export const fetchContext = createContext<IFetchContext>(new FetchContext());
const Provider = fetchContext.Provider;

export function FetchContextProvider({ children }: { children: React.ReactFragment }) {
    const userContext = useContext(LoginStatusContext);

    return (
        <Provider value={new FetchContext(userContext.loginData?.token)}>
            {children}
        </Provider>
    );
}
