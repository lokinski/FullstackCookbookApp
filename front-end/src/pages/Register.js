import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import RegisterForm from '../components/registerForm';

class Register extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={6}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;