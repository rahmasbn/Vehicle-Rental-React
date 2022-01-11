import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleType from "./pages/VehicleType/index";
import History from "./pages/History";
import About from "./pages/About";
import Profile from "./pages/Profile";
import VehicleDetail from "./pages/VehicleDetail";
import Popular from "./pages/VehicleType/popular";
import Cars from "./pages/VehicleType/Cars";
import Motorbike from "./pages/VehicleType/Motorbike";
import Bike from "./pages/VehicleType/Bike";
import ForgotPass from "./pages/ForgotPassword";
import Reservation from "./pages/Reservation";
import Message from "./pages/Message";
import NotFound from "./pages/NotFound";

// import Counter from "./components/Counter";

function Main() {
  const token = JSON.parse(localStorage.getItem("vehicle-rental-token"));
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPass} />
        <Route exact path="/vehicle-type" component={VehicleType} />
        <Route path="/vehicle-detail" component={VehicleDetail} />
        <Route path="/vehicle-type/popular" component={Popular} />
        <Route path="/vehicle-type/cars" component={Cars} />
        <Route path="/vehicle-type/motorbikes" component={Motorbike} />
        <Route path="/vehicle-type/bikes" component={Bike} />
        <Route path="/about" component={About} />
        <Route
          path="/history"
          render={(routerProps) => {
            if (!token) return <Redirect to="/login" />;
            return <History {...routerProps} />;
          }}
        />
        <Route
          path="/profile"
          render={(routerProps) => {
            if (!token) return <Redirect to="/login" />;
            return <Profile {...routerProps} />;
          }}
        />
        <Route
          path="/message"
          render={(routerProps) => {
            if (!token) return <Redirect to="/login" />;
            return <Message {...routerProps} />;
          }}
        />
        <Route
          path="/reservation"
          render={(routerProps) => {
            if (!token) return <Redirect to="/login" />;
            return <Reservation {...routerProps} />;
          }}
        />
        <Route path="*" component={NotFound} />

        {/* <Route path="/counter" component={Counter} /> */}
      </Switch>
    </Router>
  );
}

export default Main;
