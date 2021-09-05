import logo from './logo.svg';
import './App.css';
import React from 'react';
import Airtable, { Base } from "airtable";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ConnectedClassPanelComponent} from './ClassPanel'
import {withRouter} from 'react-router-dom'
import {ConnectedLoginComponent} from './Login'


class App extends React.Component {

  render() {
    return (
        <Switch>
          <Route path="/" exact component={ConnectedLoginComponent}/>
          <Route path="/classes" component={ConnectedClassPanelComponent}/>
        </Switch>
       );
  }

}

export default withRouter(App);
