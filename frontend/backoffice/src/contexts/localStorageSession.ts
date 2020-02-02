import { ILoginState, ISessionProvider } from './login.context';

export class LocalStorageSession implements ISessionProvider {
    public constructor(private key: string) {

    }

    public getSession(): ILoginState | null {
        const storeItem = localStorage?.getItem(this.key);

        if (!storeItem) {
            return null;
        }

        return JSON.parse(storeItem) as ILoginState | null;
    }
    public setSession(state: ILoginState): Promise<any> {
        localStorage.setItem(this.key, JSON.stringify(state));
        return Promise.resolve();
    }

    public clearSession(): Promise<any> {
        localStorage.removeItem(this.key);
        return Promise.resolve();
    }
}
