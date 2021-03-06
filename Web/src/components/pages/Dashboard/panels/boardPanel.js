/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { Component } from 'react';
import { Button, Dropdown, Card, Col, Menu } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Droppable, Draggable } from "react-beautiful-dnd";

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

export const BoardPanel = (props) => {

  const isMobile = props.isMobile;
  const droppableId = props.droppableId;
  const displayAddCard = props.displayAddCard;
  const displayMoveAllCards = props.displayMoveAllCards;

  return (
    <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{ width: "100%", paddingRight: (isMobile === true) ? '0px' : '16px' }}>
      <Card size="small" title={<span style={{ fontWeight: 600 }}>{props.title}</span>} extra={<Dropdown overlay={<Menu onClick={handleMenuClick}>
        <Menu.Item key={`E${droppableId}`}>Edit Board</Menu.Item>
        <Menu.Item key={`DB${droppableId}`}>Delete Board</Menu.Item>
        <Menu.Divider />
        <Menu.Item key={`M${droppableId}`} onClick={() => displayMoveAllCards(`${droppableId}`)}>Move all cards</Menu.Item>
        <Menu.Item key={`DC${droppableId}`}>Delete all cards</Menu.Item>
      </Menu>} trigger={['click']}>
        <Button type="text"><EllipsisOutlined /></Button>
      </Dropdown>} style={{ width: "100%" }} headStyle={{ backgroundColor: props.color }} bodyStyle={{ padding: '0px' }}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {props.items.map((item, index) => (
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
        <div style={{ width: '100%', padding: grid, paddingTop: '0px' }}>
          <Button onClick={() => displayAddCard(`${droppableId}`)} icon={<PlusOutlined />} style={{ width: '100%' }}>Add new card</Button>
        </div>
      </Card>
    </Col>
  );
}