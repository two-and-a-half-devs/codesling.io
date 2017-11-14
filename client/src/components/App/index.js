import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../LandingPage';
import ProtectedSling from '../Sling';
import Auth from '../Auth';
import InvalidSlingError from '../Sling/InvalidSlingError';
import Protected from '../globals/Protected';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/slingError' component={InvalidSlingError} />
        <Route path='/:slingId' component={ProtectedSling} />
        <Route path='/' component={(props) => (
          <Protected component={LandingPage} {...props} />
        )} />
      </Switch>
    </div>
  );
};

export default App;
