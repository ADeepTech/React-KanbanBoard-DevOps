/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
import { Button, Dropdown, Card, Form, Input, Menu, Modal, Col, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BoardPanel } from "./panels";

import './dashboard.scss';

// fake data generator
const getToDoItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `todo-${k}`,
    title: `To do ${k}`,
    content: `todo ${k}`
  }));
const getDoingItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `doing-${k}`,
    title: `Doing ${k}`,
    content: `doing ${k}`
  }));
const getDoneItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `done-${k}`,
    title: `Done ${k}`,
    content: `done ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  padding: grid,
  width: "100%"
});

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Edit Board</Menu.Item>
    <Menu.Item key="2">Delete Board</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: getToDoItems(3),
      selected: getDoingItems(3),
      selectedDone: getDoneItems(3),
      displayAddCard: false,
      dashboard: null,
      intervalId: '',
      tagTime: '',
      avgLightIntensity: [],
      avgVoltage: [],
      avgCurrent: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setResult = this.setResult.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.displayAddCard = this.displayAddCard.bind(this);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  id2List = {
    droppable: 'items',
    droppable2: 'selected',
    droppable3: 'selectedDone'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable1') {
        state = { items: items };
      } else if (source.droppableId === 'droppable2') {
        state = { selected: items };
      } else if (source.droppableId === 'droppable3') {
        state = { selectedDone: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      console.log("result.droppable", result.droppable);
      console.log("result.droppable2", result.droppable2);
      console.log("result", result);

      console.log("source.droppableId", source.droppableId);
      console.log("destination.droppableId", destination.droppableId);
      this.setResult(source.droppableId, result);
      this.setResult(destination.droppableId, result);
      /*this.setState({
        items: result.droppable,
        selected: result.droppable2
      });*/
    }
  }

  setResult(id, result) {
    if (id === 'droppable') {
      this.setState({ items: result.droppable });
    } else if (id === 'droppable2') {
      this.setState({ selected: result.droppable2 });
    } else if (id === 'droppable3') {
      this.setState({ selectedDone: result.droppable3 });
    }
  }

  handleOk() {
    this.setState({
      displayAddCard: false
    });
  }

  handleCancel() {
    this.setState({
      displayAddCard: false
    });
  }

  displayAddCard(id) {
    this.setState({
      displayAddCard: true
    });
  }

  render() {
    const isMobile = this.props.isMobile;
    const displayAddCard = this.displayAddCard;
    return (
      <div id="Dashboard" style={{ height: '100%', paddingTop: '16px', paddingLeft: '16px' }}>
        <section id="AC-Inner-Content" className="AC-Inner-Content">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row>
              <BoardPanel
                title="To Do"
                color='#40a9ff'
                droppableId="droppable"
                items={this.state.items}
                displayAddCard={displayAddCard}
              />
              <BoardPanel
                title="Doing"
                color='#9254de'
                droppableId="droppable2"
                items={this.state.selected}
                displayAddCard={displayAddCard}
              />
              <BoardPanel
                title="Done"
                color='#73d13d'
                droppableId="droppable3"
                items={this.state.selected}
                displayAddCard={displayAddCard}
              />
            </Row>
          </DragDropContext>
        </section>
        <Modal
          title="Add Card"
          visible={this.state.displayAddCard}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="Title">
              <Input />
            </Form.Item>
            <Form.Item label="Content">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}