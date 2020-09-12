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

export class BoardPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayAddCard: false,
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps) {
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
    const droppableId = this.props.droppableId;
    const displayAddCard = this.props.displayAddCard;
    return (
      <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{ width: "100%", paddingRight: (isMobile === true) ? '0px' : '16px' }}>
        <Card title={this.props.title} extra={<Dropdown overlay={menu} trigger={['click']}>
          <a>Actions <DownOutlined /></a>
        </Dropdown>} style={{ width: "100%" }} headStyle={{ backgroundColor: this.props.color }} bodyStyle={{ padding: '0px' }}>
          <div style={{ width: '100%', padding: grid, paddingBottom: '0px' }}>
            <Button onClick={() => displayAddCard(`${droppableId}`)} style={{ width: '100%' }}>Add Card</Button>
          </div>
          <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {this.props.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        <Card title={item.title}>
                          {item.content}
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Card>
      </Col>
    );
  }
}