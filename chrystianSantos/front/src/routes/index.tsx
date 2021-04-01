import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreatePeople } from '../pages/CreatePeople';
import { Animal } from '../pages/Animal';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={CreatePeople} />
    <Route path="/animal" exact component={Animal} />
  </Switch>
);
