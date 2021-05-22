import React from "react";
import { Route, Switch } from "react-router-dom";
import { Formulario, Simulacao } from "../pages";

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/resultado' component={Simulacao} />
      <Route path='/' component={Formulario} />
    </Switch>
  );
}
