import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Layout from './hoc/Layout/Layout';
import Leaderboadr from './containers/Leaderboard/Leaderboard';
import PersonForm from './components/PersonForm/PersonForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Layout>
          <Switch>
            <Route path="/newperson" component={PersonForm} />
            <Route path="/" component={Leaderboadr} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default App;
