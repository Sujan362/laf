import React, { Component } from "react";
import { Redirect } from "react-router";
import "../assets/css/Login.css";
import StudentHome from "../StudentHome";

export default class Login extends Component {
  state = {};

  render() {
    if (this.props.redirect) {
      var url = "/StudentHome";
      var userData = JSON.parse(localStorage.getItem("sessionData"));
      if (userData.user_type === "ADMIN") {
        url = "/AdminHome";
      }
      return <Redirect push to={url} />;
    }
    return (
      <React.Fragment>
        <div style={{ backgroundColor: "black" }}>
          <form onSubmit={this.props.onSubmitHandler}>
            <div class="container" id="loginbox">
              <div class="container" id="loginlogo">
                <h1 id="loginlogotxt">
                  Lost <span id="loginspan1"> & </span>
                  <span id="loginspan2">Found</span>
                </h1>
              </div>

              <div class="container" id="logincont">
                <label for="uname">
                  <b>Username</b>
                </label>
                <input
                  id="loginInput"
                  onChange={this.props.onChangeId}
                  type="text"
                  value={this.props.uid}
                  placeholder="Enter Username"
                  name="uname"
                  required
                />

                <label for="psw">
                  <b>Password</b>
                </label>
                <input
                  onChange={this.props.onChangePassword}
                  id="loginInput"
                  type="password"
                  value={this.props.password}
                  placeholder="Enter Password"
                  name="psw"
                  required
                />

                <button type="submit" value="submit" id="loginbtn">
                  Login as Student
                </button>
                <button onClick={this.props.onSubmitAdmin} id="loginbtnadmin">
                  Login as Admin
                </button>
                <center>
                  <p style={{ color: "red" }}>{this.props.errorMsg}</p>
                </center>
                <div style={{ marginTop: "250px" }}></div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
