import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import LoginForm from '../components/loginForm';

class Login extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={6}>
            <LoginForm location={this.props.location} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;