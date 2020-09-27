/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { useState } from 'react';
import { Button, Menu, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//import { SettingsPanel } from "./panels";
//import * as AuthHelper from "../../../helpers/authHelper";
import './header.scss';

/** The header component for the top of the page */
export default function HeaderLayout(props) {

  const [name, setName] = useState(0);

  const logout = () => {
    //this.props.logout({ Token: AuthHelper.getToken() });
    //AuthHelper.logout();
    props.history.push(`/login`);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">Add board</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">Use Template</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <div className="NavBar" style={{ background: '#005a9e', padding: '0', height: '50px', lineHeight: '50px', color: '#FFF', borderBottom: 'none' }}>
      <div style={{ float: 'left', marginLeft: '10px', fontSize: '22px', verticalAlign: 'middle' }}>
        <span className="AIconButton">
          {/*<OfficeIcon onClick={this.onCollapse} iconName="CollapseMenu" style={{ fontSize: '22px' }} />*/}
        </span>
      </div>
      <div style={{ float: 'right', marginRight: '10px' }} >
        <Popover content={menu} title={null} trigger="click" placement='bottomRight' arrowPointAtCenter={false}>
          <Button icon={<PlusOutlined />} type="link" />
        </Popover>
      </div>

    </div>
  );
}