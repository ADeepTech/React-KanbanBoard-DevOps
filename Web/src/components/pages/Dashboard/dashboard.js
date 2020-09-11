/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
import { Button, Card, Form, Input, Modal, Col, Row } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: getToDoItems(10),
      selected: getDoingItems(5, 10),
      selectedDone: getDoneItems(5, 10),
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
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };
    return (
      <div id="Dashboard" style={{ height: '100%', paddingTop: '16px', paddingLeft: '16px' }}>
        <section id="AC-Inner-Content" className="AC-Inner-Content">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{ width: "100%", paddingRight: (isMobile === true) ? '0px' : '16px' }}>
                <Card title="To Do" extra={<a href="#">More</a>} style={{ width: "100%" }} headStyle={{ backgroundColor: '#40a9ff' }} bodyStyle={{ padding: '0px' }}>
                  <div style={{ width: '100%', padding: grid, paddingBottom: '0px' }}>
                    <Button onClick={() => displayAddCard("droppable")} style={{ width: '100%' }}>Add Card</Button>
                  </div>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.items.map((item, index) => (
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
              <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{ paddingRight: (isMobile === true) ? '0px' : '16px' }}>
                <Card title="Doing" extra={<a href="#">More</a>} style={{ width: "100%" }} headStyle={{ backgroundColor: '#9254de' }} bodyStyle={{ padding: '0px' }}>
                  <div style={{ width: '100%', padding: grid, paddingBottom: '0px' }}>
                    <Button onClick={() => displayAddCard("droppable2")} style={{ width: '100%' }}>Add Card</Button>
                  </div>
                  <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.selected.map((item, index) => (
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
              <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{ paddingRight: (isMobile === true) ? '0px' : '16px' }}>
                <Card title="Done" extra={<a href="#">More</a>} style={{ width: "100%" }} headStyle={{ backgroundColor: '#73d13d' }} bodyStyle={{ padding: '0px' }}>
                  <div style={{ width: '100%', padding: grid, paddingBottom: '0px' }}>
                    <Button onClick={() => displayAddCard("droppable3")} style={{ width: '100%' }}>Add Card</Button>
                  </div>
                  <Droppable droppableId="droppable3">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.selectedDone.map((item, index) => (
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