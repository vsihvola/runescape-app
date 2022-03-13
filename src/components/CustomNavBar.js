import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="me-auto">
          <Nav.Item>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src="./logo.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
              </Navbar.Brand>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <NavDropdown title="Archeology">
            <LinkContainer to="/archeology_materials">
              <NavDropdown.Item>Archeology materials</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/archeology_calculator">
              <NavDropdown.Item>Archeology calculator</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link>Pricing</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
