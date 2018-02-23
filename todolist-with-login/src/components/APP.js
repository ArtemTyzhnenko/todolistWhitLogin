import ToDoListApp from './MainToDoList/ToDoListApp';
import Authentication from './AuthenticationUser/Authentication'
import React from 'react';
import PrivateRouter from './PrivateRouter';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

const APP = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Authentication}/>
      <PrivateRouter exact path='/todolist' component={ToDoListApp}/>
      <Redirect to="/todolist"/>
    </Switch>)
};

export default APP;