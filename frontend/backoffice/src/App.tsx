import React, { lazy, Suspense } from 'react';
import AppBar from './components/app-bar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginStatusProvider } from './contexts/login.context';
import { LocalStorageSession } from './contexts/localStorageSession';
import { FetchContextProvider } from './contexts/fetch.context';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationProvider } from './contexts/notification.context';
// import { persistStore } from 'redux-persist';
// import { asyncSessionStorage, asyncLocalStorage } from 'redux-persist/storages';
// import { createStore } from 'redux';

// const store = createStore((state) => state);
// persistStore(store, { storage: asyncSessionStorage });

const App = () => {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <LoginStatusProvider provider={new LocalStorageSession('startportal')}>
          <FetchContextProvider>
            <AppBar />
            <Suspense fallback={<CircularProgress style={{ margin: '0 auto' }} />} >
              <Switch>
                <Route path="/login" component={lazy(() => import('./pages/login.page'))} />
                <Route path="/definition" component={lazy(() => import('./pages/car-definition/car.definition.context'))} />
                <Route path="/" exact component={lazy(() => import('./pages/home.page'))} />
                <Route component={() => <div>Nie ma takiego adresu!</div>} />
              </Switch>
            </Suspense>
          </FetchContextProvider>
        </LoginStatusProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
