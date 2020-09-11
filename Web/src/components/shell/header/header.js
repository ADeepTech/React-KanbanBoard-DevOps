/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
//import { SettingsPanel } from "./panels";
//import * as AuthHelper from "../../../helpers/authHelper";
import './header.scss';

/** The header component for the top of the page */
export default class HeaderLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDropdown: '',
      isCalloutHidden: true
    };
    this.onChangeHeaderDrop = this.onChangeHeaderDrop.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleWindowMousedown);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleWindowMousedown);
  }

  logout() {
    //this.props.logout({ Token: AuthHelper.getToken() });
    //AuthHelper.logout();
    this.props.history.push(`/login`);
  }

  _onRenderCaretDown() {
    return null;
  }

  _CollapseMenu() {
  }

  _onCalloutDismiss = () => {
    this.setState({
      isCalloutHidden: true
    });
  };

  _onShowMenuClicked = () => {
    this.setState({
      isCalloutHidden: !this.state.isCalloutHidden
    });
  };

  onChangeHeaderDrop(event, option, index) {
    if (option.title === 'Log Out') {
      this.logout();
    }
  }
  
  onCollapse() {
    this.props.onCollapse();
  }

  render() {
    return (
      <div className="NavBar" style={{ background: '#005a9e', padding: '0', height: '50px', lineHeight: '50px', color: '#FFF', borderBottom: 'none' }}>
        <div style={{ float: 'left', marginLeft: '10px', fontSize: '22px', verticalAlign: 'middle' }}>
          <span className="AIconButton">
            {/*<OfficeIcon onClick={this.onCollapse} iconName="CollapseMenu" style={{ fontSize: '22px' }} />*/}
          </span>
        </div>
        <div className="Header-buttons">
          <div className="ms-FocusZone" style={{ height: '50px' }}>
          </div>
        </div>
      </div>
    );
  }
}