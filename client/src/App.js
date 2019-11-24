import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Painel from "./components/template/Painel";
import PeopleList from "./screens/PeopleList";
import PeopleNew from "./screens/PeopleNew";
import FarmList from './screens/FarmList';
import FarmNew from './screens/FarmNew';
import AnimalList from './screens/AnimalList';
import AnimalNew from './screens/AnimalNew';


export default () => {
  return (

    <Router>
      <Switch>
        <Painel>
          <Route exact path="/animais" component={AnimalList} />
          <Route exact path="/animais/novo" component={AnimalNew} />
          <Route exact path="/animais/:id/editar" component={AnimalNew} />

          <Route exact path="/fazendas" component={FarmList} />
          <Route exact path="/fazendas/nova" component={FarmNew} />
          <Route exact path="/fazendas/:id/editar" component={FarmNew} />
          
          <Route exact path="/pessoas" component={PeopleList} />
          <Route exact path="/pessoas/nova" component={PeopleNew} />
          <Route exact path="/pessoas/:id/editar" component={PeopleNew} />
        </Painel>
      </Switch>
    </Router>
  );
}
