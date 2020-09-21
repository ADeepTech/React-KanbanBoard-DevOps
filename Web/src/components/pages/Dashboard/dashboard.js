/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
import { Button, Dropdown, Card, Form, Input, Menu, Modal, Col, Row, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BoardPanel } from "./panels";

import './dashboard.scss';

const { Option } = Select;

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

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: getToDoItems(3),
      selected: getDoingItems(3),
      selectedDone: getDoneItems(3),
      displayAddCard: false,
      displayMoveAllCards: false,
      dashboard: null,
      from: null,
      dest: null,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setResult = this.setResult.bind(this);
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

  handleOk = () => {
    this.setState({
      displayAddCard: false
    });
  }

  handleCancel = () => {
    this.setState({
      displayAddCard: false,
      displayMoveAllCards: false
    });
  }

  displayAddCard = (id) => {
    this.setState({
      displayAddCard: true
    });
  }

  displayMoveAllCards = (from) => {
    console.log("from", from);
    this.setState({
      displayMoveAllCards: true,
      from: from,
      dest: null
    });
  }

  handleMoveAllCards = () => {
    const id = this.state.from;
    const dest = this.state.dest;
    let fromDroppable = [];
    let destDroppable = [];
    if (id === 'droppable') {
      fromDroppable = this.state.items;
      this.setState({ items: [] });
    } else if (id === 'droppable2') {
      fromDroppable = this.state.selected;
      this.setState({ selected: [] });
    } else if (id === 'droppable3') {
      fromDroppable = this.state.selectedDone;
      this.setState({ selectedDone: [] });
    }
    if (dest === 'droppable') {
      destDroppable = this.state.items.concat(fromDroppable);
      this.setState({ items: destDroppable });
    } else if (dest === 'droppable2') {
      destDroppable = this.state.selected.concat(fromDroppable);
      this.setState({ selected: destDroppable });
    } else if (dest === 'droppable3') {
      destDroppable = this.state.selectedDone.concat(fromDroppable);
      this.setState({ selected: destDroppable });
    }
    console.log("fromDroppable", fromDroppable);
    console.log("destDroppable", destDroppable);
    this.setState({
      displayMoveAllCards: false
    });
  }

  handleMoveChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      dest: value
    });
  }

  render() {
    const isMobile = this.props.isMobile;
    const displayAddCard = this.displayAddCard;
    const displayMoveAllCards = this.displayMoveAllCards;
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
                displayMoveAllCards={displayMoveAllCards}
              />
              <BoardPanel
                title="Doing"
                color='#9254de'
                droppableId="droppable2"
                items={this.state.selected}
                displayAddCard={displayAddCard}
                displayMoveAllCards={displayMoveAllCards}
              />
              <BoardPanel
                title="Done"
                color='#73d13d'
                droppableId="droppable3"
                items={this.state.selectedDone}
                displayAddCard={displayAddCard}
                displayMoveAllCards={displayMoveAllCards}
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
        <Modal
          title="Move all Cards"
          visible={this.state.displayMoveAllCards}
          onOk={this.handleMoveAllCards}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="Destination">
              <Select onChange={this.handleMoveChange}>
                <Option value="droppable">To Do</Option>
                <Option value="droppable2">Doing</Option>
                <Option value="droppable3">Done</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}