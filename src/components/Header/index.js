import logo from "../../assets/icons/logo.png";
import mail from "../../assets/icons/mail-icon.png";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import React, { Component } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../redux/actions/auth";
import { logout } from "../../utils/https/auth";
import Swal from "sweetalert2";

import "./header.css";

class Header extends Component {
  state = {
    show: true,
    userToken: "",
    isLogin: false,
    profilePic: require("../../assets/images/avatar.jpg"),
  };

  onLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const token = this.props.token;
        logout(token)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        this.props.dispatch(logoutAction());

        Swal.fire({
          icon: "success",
          title: "Logout Success",
          text: "You have successfully logged out",
        });

        this.setState({
          userToken: "",
          isLogin: false,
        });

        setTimeout(() => {
          window.location.reload(false);
        }, 5000);
      }
    });
  };

  componentDidMount() {
    const token = this.props.token;
    const image = this.props.auth.userData.photo;

    if (image !== null) {
      // this.props.dispatch(updateUserPhoto(image));
      this.setState({
        profilePic: process.env.REACT_APP_HOST + `/${image}`,
      });
    }
    if (token) {
      this.setState({
        userToken: token,
        isLogin: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('props', prevProps)
    const image = this.props.auth.userData.photo;
    // console.log('imgHeader', image)
    if (image !== prevProps.auth.userData.photo) {
      this.setState({
        profilePic: process.env.REACT_APP_HOST + `/${image}`,
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
              <Nav.Link as={NavLink} to="/vehicles" className="mx-3">
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
                    {/* <figcaption>1</figcaption> */}
                    <img src={mail} alt="mail" width={28} height={28} />
                  </Nav.Link>
                  <NavDropdown
                    title={
                      <img
                        className="profilePic"
                        src={this.state.profilePic}
                        alt="user pic"
                        onError={({ currentTarget }) => {
                          console.log(currentTarget);
                          currentTarget.onerror = null;
                          currentTarget.src = require("../../assets/images/default-img.png");
                        }}
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    auth: state.auth,
    // image: state.userPhoto.userPhoto
  };
};
export default connect(mapStateToProps)(Header);
