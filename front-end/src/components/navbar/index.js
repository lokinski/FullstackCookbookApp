import React, { Component } from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from "react-router-dom";

import UserContext from '../../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faUser, faDrumstickBite, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ORANGE_COLOR, RED_COLOR } from '../../constans/colors';

import './styles/navbar.css';

class Navbar extends Component {
  static contextType = UserContext;
  
  state = {
    activeNav: "",
    redirect: false
  };

  changeActiveNav(key) {
    this.setState({ activeNav: key });
  }

  async handleLogout() {
    const user = this.context;

    const result = await user.logout();
    if (!result.errors) {
      this.setState({ redirect: true });
    }
  }

  componentDidMount() {

  }

  render() {
    const user = this.context;
    const isLoggedIn = user.isLoggedIn;

    if (this.state.redirect) {
      this.setState({ redirect: false, activeNav: '' });
      return <Redirect to="/" />
    }

    return (
      <BootstrapNavbar sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
        <Container fluid="lg">
          <LinkContainer to="/">
            <BootstrapNavbar.Brand onClick={() => this.changeActiveNav('')}>Cookbook</BootstrapNavbar.Brand>
          </LinkContainer>
          <BootstrapNavbar.Toggle aria-controls="navbar" />
          <BootstrapNavbar.Collapse id="navbar">
            <Nav variant="custom" className="mr-auto" activeKey={this.state.activeNav} onSelect={(key) => this.changeActiveNav(key)}>
              <LinkContainer to="/recipes">
                <Nav.Link><FontAwesomeIcon icon={faCookieBite} color={ORANGE_COLOR} className="mr-1" />Recipes</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search">
                <Nav.Link><FontAwesomeIcon icon={faDrumstickBite} color={ORANGE_COLOR} className="mr-1" />Search</Nav.Link>
              </LinkContainer>
            </Nav>
            {isLoggedIn 
              ? <Nav activeKey={this.state.activeNav} onSelect={(key) => this.changeActiveNav(key)}>
                  <NavDropdown alignRight title={user.username} id="collasible-nav-dropdown">
                    <LinkContainer to={`/profile/${user.username}`}>
                      <NavDropdown.Item><FontAwesomeIcon icon={faUser} color={ORANGE_COLOR} className="mr-1 icon" />Your profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/add">
                      <NavDropdown.Item><FontAwesomeIcon icon={faPlus} color={ORANGE_COLOR} className="mr-1 icon" />Add a recipe</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.handleLogout.bind(this)}><FontAwesomeIcon icon={faSignOutAlt} color={RED_COLOR} className="mr-1 icon" />Log out</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              : <Nav variant="custom" activeKey={this.state.activeNav} onSelect={(key) => this.changeActiveNav(key)}>
                  <LinkContainer to="/login">
                    <Nav.Link><FontAwesomeIcon icon={faUser} color={ORANGE_COLOR} className="mr-1 icon" />Login</Nav.Link>
                  </LinkContainer>
                </Nav>
            }
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    );
  }
}

export default Navbar;
