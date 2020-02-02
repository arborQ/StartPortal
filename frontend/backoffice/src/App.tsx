import React, { lazy, Suspense  } from 'react';
import AppBar from './components/app-bar';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Suspense fallback={<div>loading...</div>} >
        <Switch>
          <Route path="/login" component={lazy(() => import('./pages/login.page'))} />
          <Route path="/" exact component={() => <div>Home</div>} />
          <Route component={() => <div>Unkown?</div>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
