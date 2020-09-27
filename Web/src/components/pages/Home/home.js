/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
import { getProjectList } from "../../../store/actions/projectActions";

export default function Home() {
  const dispatch = useDispatch();
  const projectList = useSelector(state => state.project.projectList);
  const [sortBy, setSortBy] = useState("DESC");

  useEffect(() => {
    console.log("useEffect");
    dispatch(getProjectList());
  }, [dispatch]);

  return (
    <div id="home" style={{ height: '100%', padding: '16px' }}>
      <Row gutter={[16, 16]}>
        {
          (projectList.length > 0) && projectList.map(el => (
            <Col key={el} xs={24} sm={24} md={24} lg={4} xl={4}>
              <Card title={`${el}`}>
                {el}
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}