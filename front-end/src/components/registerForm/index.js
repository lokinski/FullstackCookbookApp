import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import UserContext from "../../context/UserContext";

class RegisterForm extends Component {
  static contextType = UserContext;

  state = {
    errors: [],
    duringSubmit: false,
    redirect: false,
    redirectTo: '/'
  };

  async submitForm(event) {
    event.preventDefault();
    this.setState({ duringSubmit: true });

    const formElements = event.target.elements;
    const username = formElements.nickname.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const password2 = formElements.password2.value;

    if (password !== password2) {
      this.setState({ errors: ['Passwords should be the same'], duringSubmit: false });
      return;
    }

    const user = this.context;
    
    const result = await user.register(username, email, password);
    if (result.errors) {
      this.setState({ errors: result.errors, duringSubmit: false });
      return;
    }

    this.setState({ redirectTo: '/login?register=success', redirect: true });
  }

  render() {
    const user = this.context;

    if (this.state.redirect || user.isLoggedIn) {
      return <Redirect to={this.state.redirectTo} />
    }

    return (
      <Form onSubmit={this.submitForm.bind(this)} style={{"boxShadow": 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', "padding": "15px"}}>
        {this.state.errors.map((error, id) => 
          (<Alert key={id} variant="danger">{error}</Alert>)
        )}

        <Form.Group controlId="nickname">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter a ausername" required />
          <Form.Text muted>
            Username.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter an email" required />
          <Form.Text muted>
            Email address.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter a password"  required />
          <Form.Text muted>
            Password.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password2">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control type="password" placeholder="Enter a password again"  required />
          <Form.Text muted>
            Repeat password.
          </Form.Text>
        </Form.Group>

        <Button variant="danger" type="submit" disabled={this.state.duringSubmit} block>
          Register
        </Button>
      </Form>
    );
  }
}

export default RegisterForm;
