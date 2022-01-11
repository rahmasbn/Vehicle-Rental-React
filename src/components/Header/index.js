import logo from "../../assets/images/logo.png";
import mail from "../../assets/images/mail-icon.png";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import React, { Component } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

import "./header.css";
import axios from "axios";

class Header extends Component {
  state = {
    show: true,
    userToken: "",
    isLogin: false,
    profilePic: require("../../assets/images/avatar.jpg"),
  };

  onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("vehicle-rental-token");
    localStorage.removeItem("vehicle-rental-idUser");
    localStorage.removeItem("vehicle-rental-roleUser");

    this.setState({
      userToken: "",
      isLogin: false,
    });

  };

  componentDidMount() {
    const token = localStorage.getItem("vehicle-rental-token");
    const idUser = localStorage.getItem("vehicle-rental-idUser");
    const URL = `http://localhost:8000/users/${idUser}`;
    // console.log(URL);
    if(idUser) {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        const image = res.data.result.data[0].image;
        // console.log('photo: ', image);
        if (image !== null) {
          this.setState({
            profilePic: `http://localhost:8000/${image}`,
          });
        }
        this.setState({
          userToken: JSON.parse(token),
          isLogin: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  render() {
    const { isLogin } = this.state;
    // console.log(isLogin);

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
              <Nav.Link
                as={NavLink}
                exact
                to="/"
                className="mx-3"
                activeClassName="active"
              >
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/vehicle-type" className="mx-3">
                Vehicle Type
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history" className="mx-3">
                History
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="mx-3">
                About
              </Nav.Link>
              {isLogin ? (
                <>
                  <Nav.Link as={Link} to="/message" className="mx-3 mail">
                    <img src={mail} alt="mail" width={28} height={28} />
                  </Nav.Link>
                  <NavDropdown
                    title={
                      <img
                        className="profilePic"
                        src={this.state.profilePic}
                        alt="user pic"
                      />
                    }
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      Edit Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/help">
                      Help
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={this.onLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
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
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default Header;
