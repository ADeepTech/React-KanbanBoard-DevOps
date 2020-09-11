/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React from 'react';
import { Layout } from 'antd';
import HeaderLayout from './header/header';
import SiderLayout from './sider/sider';
//import * as AuthHelper from "../../../helpers/authHelper";

import './shell.scss';

const { Content, Footer } = Layout;

export default class Shell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: (this.props.isMobile) ? true : false,
            showPanel: false
        };
        this.onCollapse = this.onCollapse.bind(this);
    }

    componentWillMount() {
        /*if (!AuthHelper.loggedIn()) {
            this.props.history.push(`/login`);
        }*/
    }

    componentDidUpdate(prevProps) {
        const isMobile = this.props.isMobile;
        if (isMobile !== null && isMobile !== prevProps.isMobile) {
            this.setState({
                collapsed: (isMobile) ? true : false,
            });
        }
    }

    onCollapse() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { Component, match, theme, history, isMobile, logout } = this.props;
        return (
            <Layout id="AC-Body" className={`shell-container theme-${theme}`} style={{ minHeight: '100vh' }}>
                <SiderLayout
                    defaultOpenKeys={this.props.defaultOpenKeys}
                    defaultSelectedKeys={this.props.defaultSelectedKeys}
                    collapsed={this.state.collapsed} />
                <Layout className="shell">
                    <HeaderLayout history={history}
                        setTheme={this.props.setTheme}
                        theme={this.props.theme}
                        onCollapse={this.onCollapse}
                        _showPanel={this._showPanel}
                        _hidePanel={this._hidePanel}
                        logout={logout} />
                    <Content id="ant-layout-content" style={{ margin: '0px', marginTop: '0px', minHeight: 'auto' }}>
                        <Component route={match} history={history} isMobile={isMobile} onCollapse={this.onCollapse} collapsed={this.state.collapsed} />
                    </Content>
                    <Footer style={{ textAlign: 'center', padding: '15px' }}>ADeepTech - AndyNgKM ©2020 v1.0.0</Footer>
                </Layout>
            </Layout>
        );
    }
}