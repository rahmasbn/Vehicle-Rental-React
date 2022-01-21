import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
// import store from "./redux/store";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleType from "./pages/VehicleType/index";
import Vehicles from "./pages/VehicleType/Vehicles";
import History from "./pages/History";
import About from "./pages/About";
import Profile from "./pages/Profile";
import EditPass from "./pages/EditPassword";
import VehicleDetail from "./pages/VehicleDetail";
import Popular from "./pages/VehicleType/popular";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import ForgotPass from "./pages/ForgotPassword";
import Reservation from "./pages/Reservation";
import Message from "./pages/Message/index";
import ChatDetail from "./pages/Message/ChatDetail";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

// import Counter from "./components/Counter";

 function Main (props) {

  const accessToken = JSON.parse(localStorage.getItem("vehicle-rental-token"));
  // const accessToken = props.token;
  // console.log('token main', props.token)

  return (
    <>
      {/* <Provider store={store}> */}
        <Router>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={(routerProps) => {
                if (accessToken) return <Redirect to="/" />;
                return <Login {...routerProps} />;
              }}
            />
            <Route
              path="/register"
              render={(routerProps) => {
                if (accessToken) return <Redirect to="/" />;
                return <Register {...routerProps} />;
              }}
            />
            <Route
              path="/forgot-password"
              render={(routerProps) => {
                if (accessToken) return <Redirect to="/" />;
                return <ForgotPass {...routerProps} />;
              }}
            />
            <Route exact path="/vehicle-type" component={VehicleType} />
            <Route path="/vehicles/popular" component={Popular} />
            <Route path="/vehicles/:category" component={Vehicles} />
            <Route path="/vehicle/:id" component={VehicleDetail} />
            <Route path="/about" component={About} />
            <Route path="/edit-password" component={EditPass} />
            <Route
              path="/add-vehicle"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <AddVehicle {...routerProps} />;
              }}
            />
            <Route
              path="/edit-vehicle"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <EditVehicle {...routerProps} />;
              }}
            />
            <Route
              path="/history"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <History {...routerProps} />;
              }}
            />
            <Route
              path="/profile"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <Profile {...routerProps} />;
              }}
            />
            {/* <Route
            path="/edit-pass"
            render={(routerProps) => {
              if (!token) return <Redirect to="/login" />;
              return <EditPass {...routerProps} />;
            }}
          /> */}
            <Route
              path="/message"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <Message {...routerProps} />;
              }}
            />
            <Route
              path="/room-chat"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <ChatDetail {...routerProps} />;
              }}
            />
            <Route
              path="/reservation"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <Reservation {...routerProps} />;
              }}
            />
            <Route
              path="/payment"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/login" />;
                return <Payment {...routerProps} />;
              }}
            />
            <Route path="*" component={NotFound} />

            {/* <Route path="/counter" component={Counter} /> */}
          </Switch>
        </Router>
      {/* </Provider> */}
    </>
  );
            
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
  };
};

export default connect(mapStateToProps)(Main);
