import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreatePeople } from '../pages/CreatePeople';
import { Animal } from '../pages/Animal';
import { Batch } from '../pages/Batch';
import { BatchAnimal } from '../pages/BatchAnimal';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={CreatePeople} />
    <Route path="/animal" exact component={Animal} />
    <Route path="/batch" exact component={Batch} />
    <Route path="/batch_animal" exact component={BatchAnimal} />
  </Switch>
);
