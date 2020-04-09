import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Task from './pages/Task';
import Register from './pages/Register';
import Persona from './pages/Persona';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon} exact/>
        <Route path="/tasks" component={Task}/>
        <Route path="/register" component={Register}/>
        <Route path="/persona" component={Persona}/>
      </Switch>
    </BrowserRouter>
  )
}