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
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor } from "./redux/store";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleType from "./pages/VehicleType/index";
import Vehicles from "./pages/VehicleType/Vehicles";
import History from "./pages/History";
import About from "./pages/About";
import Profile from "./pages/Profile";
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
import ScrollToTop from "./components/scrollToTop";

// import Counter from "./components/Counter";

function Main(props) {
  // const accessToken = JSON.parse(localStorage.getItem("vehicle-rental-token"));
  if (!props.auth.userData) {
    return null;
  }
  const accessToken = props.auth.userData.token;
 
  // console.log("token main",accessToken);

  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastContainer />
          <ScrollToTop />
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
            <Route exact path="/vehicles" component={VehicleType} />
            <Route path="/vehicles/popular" component={Popular} />
            <Route path="/vehicles/:category" component={Vehicles} />
            <Route path="/about" component={About} />
            <Route
              path="/vehicle/new"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/" />;
                return <AddVehicle {...routerProps} />;
              }}
            />
            <Route
              path="/vehicle/edit/:id"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/" />;
                return <EditVehicle {...routerProps} />;
              }}
            />
            <Route exact path="/vehicle/:id" component={VehicleDetail} />
            <Route
              path="/history"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/" />;
                return <History {...routerProps} />;
              }}
            />
            <Route
              path="/profile"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/" />;
                return <Profile {...routerProps} />;
              }}
            />
            <Route
              path="/message"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/" />;
                return <Message {...routerProps} />;
              }}
            />
            <Route
              path="/room-chat"
              render={(routerProps) => {
                if (!accessToken) return <Redirect to="/" />;
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
          </Switch>
        </Router>
      </PersistGate>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Main);
