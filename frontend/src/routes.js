import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import NewTask from './pages/NewTask';
import Register from './pages/Register';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon} exact/>
        <Route path="/task" component={NewTask}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </BrowserRouter>
  )
}