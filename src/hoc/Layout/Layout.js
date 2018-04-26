import React, { Component } from 'react';

import classes from './Layout.css';

import AppBar from 'material-ui/AppBar';


class Layout extends Component {
  render(){
    return (
      <React.Fragment>
        <AppBar
          title="Saleskick"
          showMenuIconButton={false}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
};

export default Layout;