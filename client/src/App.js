import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Painel from "./components/template/Painel";
import PeopleList from "./screens/PeopleList";
import PeopleNew from "./screens/PeopleNew";


export default () => {
  return (

    <Router>
      <Switch>
        <Painel>
          <Route exact path="/pessoas" component={PeopleList} />
          <Route exact path="/pessoas/nova" component={PeopleNew} />
          <Route exact path="/pessoas/:id/editar" component={PeopleNew} />
        </Painel>
      </Switch>
    </Router>
  );
}
