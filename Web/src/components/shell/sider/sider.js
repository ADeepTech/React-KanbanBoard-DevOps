/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
//import { Layout, Menu, Icon, } from '@ant-design/icons';
//import { Icon as OfficeIcon } from 'office-ui-fabric-react/lib/Icon';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

export default class SiderLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                openKeys: this.props.defaultOpenKeys,
                defaultSelectedKeys: this.props.defaultOpenKeys
            });
        }
    }

    onOpenChange = openKeys => {
        this.setState({ openKeys });
    };

    render() {
        const imgFile = require('../../../assets/images/logo192.png');
        const baseUrl = "";//process.env.PUBLIC_URL;
        const { isMobile } = this.props;
        return (
            <Sider
                width={228}
                breakpoint="lg"
                collapsedWidth={(isMobile) ? 0 : 80}
                collapsible={true}
                collapsed={this.props.collapsed}
                trigger={null}
                style={{
                    background: '#FFF',
                    overflow: 'auto',
                    minHeight: '100vh',
                    //position: 'fixed',
                    //left: 0,
                }}
            >
                <div className="logo" style={{ textAlign: 'center' }}>
                    <Link to={`${baseUrl}/`}>
                        <img
                            alt="Automatic Controls"
                            title="Automatic Controls"
                            style={{ width: '77%', padding: '10px' }}
                            src={imgFile}
                        />
                    </Link>
                </div>
                <Menu mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={this.props.defaultSelectedKeys}
                    onOpenChange={this.onOpenChange}
                //inlineCollapsed={this.props.collapsed}
                >
                    <Menu.Item key="Home">
                        <Link to={`${baseUrl}/home`}>
                            {/*<OfficeIcon className="anticon" iconName="Home" />*/}
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Dashboard">
                        <Link to={`${baseUrl}/dashboard`}>
                            {/*<OfficeIcon className="anticon" iconName="Home" />*/}
                            <span>Dashboard</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}