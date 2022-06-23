import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

import UserContext from "../../context/UserContext";

class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    errors: [],
    duringSubmit: false,
    redirect: false
  };

  async submitForm(event) {
    event.preventDefault();
    this.setState({ duringSubmit: true });
    
    const formElements = event.target.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;

    const user = this.context;
    
    const result = await user.login(email, password);
    if (result.errors) {
      this.setState({ errors: result.errors, duringSubmit: false });
      return;
    }

    this.setState({ redirect: true });
  }

  render() {
    const user = this.context;

    if (this.state.redirect || user.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <>
        {new URLSearchParams(this.props.location.search).get('register') === 'success' 
          ? (<Alert variant="success" className="mb-4">You have successfully registered and are now able to log in.</Alert>) 
          : ''
        }
        <Form onSubmit={this.submitForm.bind(this)} style={{"boxShadow": 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', "padding": "15px"}}>
          {this.state.errors.map((error, id) => 
            (<Alert key={id} variant="danger">{error}</Alert>)
          )}

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter an email" required />
            <Form.Text muted>
              Email.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter a password"  required />
            <Form.Text muted>
              Password.
            </Form.Text>
          </Form.Group>

          <Button variant="danger" type="submit" disabled={this.state.duringSubmit} block>
            Login
          </Button>

          <Form.Text className="text-center">
            You don't have an account yet? <LinkContainer to="/register"><a href="/register">Register!</a></LinkContainer>
          </Form.Text>
        </Form>
      </>
    );
  }
}

export default LoginForm;
