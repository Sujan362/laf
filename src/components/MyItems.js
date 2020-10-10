import React, { Component } from "react";
import ItemList from "./ItemList";
import axios from "axios";
import MyItem from "./MyItem";
import { Redirect } from "react-router";

export default class MyItems extends Component {
  state = {
    uid: 1,
    myList: [],
    currentPage: "LOST",
    action: "",
  };

  showLost = (e) => {
    e.preventDefault();
    if (this.props.userType === "ADMIN") {
      var url = `/messages/myItems?uid=ADMIN&type=LOST`;
      axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
    } else {
      var uid = this.props.userInfo.student_id;
      var url = `/messages/myItems?uid=${uid}&type=LOST`;
      axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
    }
  };

  showFound = (e) => {
    e.preventDefault();
    if (this.props.userType === "ADMIN") {
      var url = `/messages/myItems?uid=ADMIN&type=FOUND`;
      axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
    } else {
      var uid = this.props.userInfo.student_id;
      var url = `/messages/myItems?uid=${uid}&type=FOUND`;
      axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
    }
  };

  displayMyItem() {
    return this.state.myList.map((myItem) => (
      <MyItem
        key={myItem.item_id}
        myItem={myItem}
        userType={this.props.userType}
      />
    ));
  }

  componentDidMount() {
    this.__isMounted = true;
    if (this.props.userType === "ADMIN") {
      var url = `/messages/myItems?uid=ADMIN&type=LOST`;
      axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
    } else {
      const userInfo = JSON.parse(localStorage.getItem("sessionData"));
      var uid = userInfo.student_id;
      var url = `/messages/myItems?uid=${uid}&type=LOST`;
      axios.get(`${url}`).then((res) => this.setState({ myList: res.data }));
    }
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <div className="container center">
          <div className="row">
            <div className="col text-center">
              <div className="pill">
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <button
                      onClick={this.showLost}
                      class="btn"
                      id="pillbtnlost"
                    >
                      Lost Items
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      onClick={this.showFound}
                      class="btn"
                      id="pillbtnfound"
                    >
                      Found Items
                    </button>
                  </li>
                </ul>
                <br />
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="home">
                    <div className="row" style={{ marginTop: "20px" }}>
                      {this.displayMyItem()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
