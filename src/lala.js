import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import mail from "../../assets/images/mail-icon.png";
import profilePic from "../../assets/images/girl-with-red-clothes.webp";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Navigate } from "react-router-dom";

import "./navbar.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }
  render() {
    return (
      <Navbar collapseOnSelect bg="white" expand="md" sticky="top">
        <Container>
          <Navbar.Brand className="brand">
            <img src={logo} alt="logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="menuBar"
            onClick={() => this.setState({ show: !this.state.show })}
          >
            {this.state.show ? <MenuIcon /> : <CloseIcon />}
          </Navbar.Toggle>
          <Navbar.Collapse id="menuBar">
            <Nav className="nav-item ms-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/" className="mx-3">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/vehicleType" className="mx-3">
                Vehicle Type
              </Nav.Link>
              <Nav.Link as={Link} to="/history" className="mx-3">
                History
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="mx-3">
                About
              </Nav.Link>
              <Link to="/login" className="nav-link">
                <Button
                  variant="outline-warning"
                  type="button"
                  size="sm"
                  className="btn-login mx-3"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" className="nav-link">
                <Button
                  type="button"
                  variant="warning"
                  size="sm"
                  className="btn-register"
                >
                  Register
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export class NavbarComp extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }
  state = {
    userToken: "",
  };
  onLogout = () => {
    localStorage.removeItem("vehicle-rental-token");
    this.setState({
      userToken: "",
    })
  }
  componentDidMount() {
    const token = localStorage.getItem("vehicle-rental-token");
    this.setState({
      userToken: JSON.parse(token),
    })
  }

  render() {
    return (
      <Navbar collapseOnSelect bg="white" expand="md" sticky="top">
      <Container>
        <Navbar.Brand className="brand">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="menuBar"
          onClick={() => this.setState({ show: !this.state.show })}
        >
          {this.state.show ? <MenuIcon /> : <CloseIcon />}
        </Navbar.Toggle>
        <Navbar.Collapse id="menuBar">
          <Nav className="nav-item ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" className="mx-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/vehicleType" className="mx-3">
              Vehicle Type
            </Nav.Link>
            <Nav.Link as={Link} to="/history" className="mx-3">
              History
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-3">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/message" className="mx-3 mail">
              <img src={mail} alt="mail" width={28} height={28}/>
            </Nav.Link>
            <NavDropdown title={
                        <img className="profilePic" 
                            src={profilePic} 
                            alt="user pic"
                        />
                } id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/profile">Edit Profile</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/help">Help</NavDropdown.Item>
          <NavDropdown.Item onClick={this.onLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
}

export default Header;
