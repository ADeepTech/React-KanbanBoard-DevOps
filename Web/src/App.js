/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Shell from './components/shell/shell';
import HomeContainer from './components/pages/Home/home.container';
import DashboardContainer from './components/pages/Dashboard/dashboard.container';
import './App.less';

const rolesAll = [1,2,3];
const rolesAdminOnly = [1,2];

const pagesConfig = [
  {
    to: '/',
    exact: true,
    Component: DashboardContainer,
    Roles: rolesAll
  },
  {
    to: '/home',
    exact: true,
    Component: HomeContainer,
    Roles: rolesAll
  },
  {
    to: '/dashboard',
    exact: true,
    Component: DashboardContainer,
    Roles: rolesAll
  },
];

class App extends React.Component {

  renderComponentsPage(props, shellProps, Roles, Component) {
    const Role = true;//AuthService.getRole();
    if (Roles && Roles.indexOf(parseInt(Role)) === -1) {
      //return <UnAuthorisedLayout {...shellProps} {...props} />
      return <Shell Component={Component} {...shellProps} {...props} />
    } else {
      return <Shell Component={Component} {...shellProps} {...props} />
    }
  }

  render() {
    const shellProps = {
      pagesConfig,
      theme: this.props.theme,
      defaultOpenKeys: this.props.defaultOpenKeys,
      defaultSelectedKeys: this.props.defaultSelectedKeys,
      isMobile: this.props.isMobile,
      ...this.props
    };
    return (
      <BrowserRouter>
        <Switch>
          {
            pagesConfig.map(({ to, exact, Component, Roles }) => {
              return (<Route exact={exact} path={to} key={to} render={props => this.renderComponentsPage(props, shellProps, Roles, Component)}
              />);
            })
          }
          {/*<Route path="/login" component={LoginContainer} />*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
