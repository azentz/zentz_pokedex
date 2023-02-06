import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="my-3">
        <Row>
          <Col>
            <div className="card card-body">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
