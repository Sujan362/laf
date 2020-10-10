import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import StudentHome from "./StudentHome";
import AdminHome from "./AdminHome";
import { Redirect } from "react-router";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  state = {
    userType: "",
    uid: "",
    password: "",
    userInfo: "",
    redirect: false,
    errorMsg: "",
  };

  componentDidMount() {
    this.setState({
      userInfo: JSON.parse(localStorage.getItem("sessionData")),
    });
  }

  logout = () => {
    this.setState({ uid: "", password: "", userInfo: "", redirect: false });
    localStorage.clear();
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    var url = `/laf/studentLogin?uid=${this.state.uid}&password=${this.state.password}`;
    axios
      .get(`${url}`)
      .then((res) => {
        this.setState({ userInfo: res.data });
        localStorage.setItem("sessionData", JSON.stringify(res.data));
      })
      .then((e) => {
        if (this.state.userInfo !== "") {
          this.setState({ redirect: true, errorMsg: "" });
        } else {
          this.setState({ errorMsg: "Username or password is incorrect." });
        }
      });
  };

  onSubmitAdmin = (e) => {
    e.preventDefault();
    var url = `/laf/adminLogin?uid=${this.state.uid}&password=${this.state.password}`;
    axios
      .get(`${url}`)
      .then((res) => {
        this.setState({ userInfo: res.data });
        localStorage.setItem("sessionData", JSON.stringify(res.data));
      })
      .then((e) => {
        if (this.state.userInfo !== "") {
          this.setState({ redirect: true, errorMsg: "" });
        } else {
          this.setState({ errorMsg: "Username or password is incorrect." });
        }
      });
  };

  onChangeId = (e) => {
    this.setState({ uid: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <Router basename="/">
        <Route
          path="/StudentHome"
          render={(props) => (
            <React.Fragment>
              <StudentHome
                logout={this.logout}
                userInfo={this.state.userInfo}
              />
            </React.Fragment>
          )}
        />
        <Route
          path="/AdminHome"
          render={(props) => (
            <React.Fragment>
              <AdminHome logout={this.logout} />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <React.Fragment>
              <Login
                onSubmitHandler={this.onSubmitHandler}
                onSubmitAdmin={this.onSubmitAdmin}
                onChangeId={this.onChangeId}
                onChangePassword={this.onChangePassword}
                uid={this.state.uid}
                password={this.state.password}
                redirect={this.state.redirect}
                errorMsg={this.state.errorMsg}
              />
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}

export default App;
