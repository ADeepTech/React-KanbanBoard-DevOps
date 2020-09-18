/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
import { Button, Dropdown, Card, Form, Input, Menu, Modal, Col, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayAddCard: false,
      dashboard: null,
      intervalId: '',
      tagTime: '',
      avgLightIntensity: [],
      avgVoltage: [],
      avgCurrent: [],
    };
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    const isMobile = this.props.isMobile;
    return (
      <div id="Dashboard" style={{ height: '100%', paddingTop: '16px', paddingLeft: '16px' }}>
        <section id="AC-Inner-Content" className="AC-Inner-Content">
        </section>
      </div>
    );
  }
}