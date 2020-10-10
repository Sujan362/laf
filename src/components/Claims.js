import React, { Component } from "react";
import Claim from "./Claim.js";
import axios from "axios";

export default class Claims extends Component {
  state = {
    claimList: [],
    temp: [],
    searchKey: "",
    searchResults: [],
    backup: [],
    currentPage: "",
  };

  componentDidMount() {
    var url = "/messages/getClaims";
    axios.get(`${url}`).then((res) => {
      this.setState({
        claimList: res.data,
        backup: res.data,
        currentPage: "INCOMPLETE",
      });
    });
  }

  showIncomplete = (e) => {
    e.preventDefault();
    var url = "/messages/getClaims";
    axios.get(`${url}`).then((res) => {
      this.setState({
        claimList: res.data,
        backup: res.data,
        currentPage: "INCOMPLETE",
      });
    });
  };

  showComplete = (e) => {
    e.preventDefault();
    var url = "/messages/getClaimsCompleted";
    axios.get(`${url}`).then((res) => {
      this.setState({
        claimList: res.data,
        backup: res.data,
        currentPage: "COMPLETED",
      });
    });
  };

  displayClaim() {
    return this.state.claimList.map((claim) => (
      <Claim key={claim.claims_id} claim={claim} />
    ));
  }

  onChangeKey = (e) => {
    this.setState({ searchKey: e.target.value });
  };

  Duplicate(item, itemList) {
    for (var i = 0; i < itemList.length; i++) {
      if (item.item_id === itemList[i].item_id) {
        return true;
      }
    }
    return false;
  }

  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ claimList: [] });
    var key = this.state.searchKey;
    var keyList = key.split(" ");
    for (var i = 0; i < keyList.length; i++) {
      console.log(keyList[i], i);
      var temp = `/messages/searchClaims?key=${keyList[i]}&currentPage=${this.state.currentPage}`;
      axios.get(`${temp}`).then((res) => {
        if (res.data && res.data.length > 0) {
          for (var j = 0; j < res.data.length; j++) {
            if (this.Duplicate(res.data[j], this.state.claimList)) {
            } else {
              this.setState({
                claimList: [...this.state.claimList, res.data[j]],
              });
            }
          }
        }
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <br />
        <div className="container center">
          <div className="row">
            <div className="col text-center">
              <div className="pill">
                <form
                  onSubmit={this.searchHandler}
                  className="nav justify-content-center"
                >
                  <div class="input-group mb-3" style={{ width: "350px" }}>
                    <input
                      onChange={this.onChangeKey}
                      value={this.state.searchKey}
                      type="text"
                      class="form-control"
                      placeholder="Search in Claims"
                      required
                    />
                    <div class="input-group-append">
                      <button class="btn" type="submit">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <button
                      onClick={this.showIncomplete}
                      class="btn"
                      id="pillbtnlost"
                    >
                      Pending Items
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      onClick={this.showComplete}
                      class="btn"
                      id="pillbtnfound"
                    >
                      Completed Items
                    </button>
                  </li>
                </ul>
                <br />
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="home">
                    <div className="row" style={{ marginTop: "20px" }}>
                      {this.displayClaim()}
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
