import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ItemList from "./components/ItemList.js";
import Inbox from "./components/Inbox.js";
import ShowMessages from "./components/ShowMessages.js";
import AdminHeader from "./components/AdminHeader";
import Claims from "./components/Claims.js";
import ClaimList from "./components/ClaimList.js";
import MyItems from "./components/MyItems";
import axios from "axios";

class AdminHome extends Component {
  state = {
    uid: 1,
    searchKey: "",
    itemList: [],
    currentPage: "",
    action: "",
    userType: "",
  };

  componentDidMount() {
    this.__isMounted = true;
    this.setState({ currentPage: "LOST", userType: "ADMIN" });
    var url = "/laf?type=LOST";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  }

  logout = () => {
    this.props.logout();
    this.setState({ redirect: true, redirectTo: "LOGOUT" });
  };

  Duplicate(item, itemList) {
    for (var i = 0; i < itemList.length; i++) {
      if (item.id === itemList[i].id) {
        return true;
      }
    }
    return false;
  }

  search = (e) => {
    e.preventDefault();
    this.setState({ itemList: [], tempList: [], action: "SEARCH" });
    var key = this.state.searchKey;
    var keyList = key.split(" ");
    for (var i = 0; i < keyList.length; i++) {
      console.log(keyList[i], i);
      var temp = `/messages/search?key=${keyList[i]}&currentPage=${this.state.currentPage}`;
      axios.get(`${temp}`).then((res) => {
        if (res.data && res.data.length > 0) {
          for (var j = 0; j < res.data.length; j++) {
            if (this.Duplicate(res.data[j], this.state.itemList)) {
            } else {
              this.setState({
                itemList: [...this.state.itemList, res.data[j]],
              });
            }
          }
        }
      });
    }
  };

  showFound = (e) => {
    e.preventDefault();
    this.setState({ currentPage: "FOUND", action: "" });
    var url = "/laf?type=FOUND";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  showLost = (e) => {
    e.preventDefault();
    this.setState({ currentPage: "LOST", action: "" });
    var url = "/laf?type=LOST";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  showCompleted = (e) => {
    e.preventDefault();
    this.setState({ currentPage: "COMPLETED", action: "" });
    var url = "/laf/completed";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  filterCompletedLost = (e) => {
    e.preventDefault();
    var url = "/laf/filterCompleted?type=LOST";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  filterCompletedFound = (e) => {
    e.preventDefault();
    var url = "/laf/filterCompleted?type=FOUND";
    axios.get(`${url}`).then((res) => this.setState({ itemList: res.data }));
  };

  searchTextOnChange = (e) => {
    this.setState({ searchKey: e.target.value });
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect push to="/" />;
    }
    return (
      <Router>
        <AdminHeader
          logout={this.logout}
          search={this.search}
          searchTextOnChange={this.searchTextOnChange}
          showFound={this.showFound}
          showLost={this.showLost}
          searchKey={this.state.searchKey}
          searchHandler={this.searchHandler}
          uid={this.state.uid}
        />
        <Route
          exact
          path="/AdminHome"
          render={(props) => (
            <React.Fragment>
              <ItemList
                items={this.state.itemList}
                showFound={this.showFound}
                showLost={this.showLost}
                showCompleted={this.showCompleted}
                filterCompletedFound={this.filterCompletedFound}
                filterCompletedLost={this.filterCompletedLost}
                itemType={this.state.currentPage}
                uid={this.state.uid}
                action={this.state.action}
                searchKey={this.state.searchKey}
                userType={this.state.userType}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/AdminFound"
          render={(props) => (
            <React.Fragment>
              <ItemList
                itemType="FOUND"
                uid={this.state.uid}
                userType="ADMIN"
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/AdminHome/inbox"
          render={(props) => (
            <React.Fragment>
              <Inbox uid={this.state.uid} userType="ADMIN" />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/AdminHome/claims"
          render={(props) => (
            <React.Fragment>
              <Claims />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/AdminHome/messages/:studentId/:itemId/:userType"
          component={ShowMessages}
        />
        <Route
          exact
          path="/AdminHome/claimList/:itemId"
          component={ClaimList}
        />
        <Route
          exact
          path="/AdminHome/myItems"
          render={(props) => (
            <React.Fragment>
              <MyItems userType={"ADMIN"} />
            </React.Fragment>
          )}
        />
        <Footer />
      </Router>
    );
  }
}

export default AdminHome;
