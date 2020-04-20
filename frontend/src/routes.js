import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Task from './pages/Task';
import Register from './pages/Register';
import Persona from './pages/Persona';
import Teste from './pages/Teste';
import Feed from './pages/Feed/index';
import Profile from './pages/Profile/index';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon} exact/>
        <Route path="/tasks" component={Task}/>
        <Route path="/feed" component={Feed}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/register" component={Register}/>
        <Route path="/persona" component={Persona}/>
        <Route path="/teste" component={Teste}/>
      </Switch>
    </BrowserRouter>
  )
}