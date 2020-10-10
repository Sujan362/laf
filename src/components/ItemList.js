import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ItemList.css";
import Items from "./Items.js";
import PostItem from "./PostItem.js";
import axios from "axios";
import AdminItemButtons from "./AdminItemButtons";
import StudentItemButtons from "./StudentItemButtons";
import CompletedFilter from "./CompletedFilter";
import PageNumbers from "./PageNumbers";

class ItemList extends Component {
  state = {
    items: [],
    startIndex: "",
    endIndex: "",
    resultsPerPage: "",
    currentPage: "",
  };

  componentDidMount() {
    this.setState({ currentPage: 1, resultsPerPage: 9 });
  }
  displayCreateButton(show) {
    if (show === "YES") {
      return (
        <PostItem
          itemType={this.props.itemType}
          userInfo={this.props.userInfo}
          userType={this.props.userType}
        />
      );
    } else if (show === "COMPLETED") {
      return (
        <CompletedFilter
          showCompleted={this.props.showCompleted}
          filterCompletedLost={this.props.filterCompletedLost}
          filterCompletedFound={this.props.filterCompletedFound}
        />
      );
    } else {
      return "";
    }
  }
  displayItemButtons(user) {
    if (user === "ADMIN") {
      return (
        <AdminItemButtons
          showLost={this.props.showLost}
          showFound={this.props.showFound}
          showCompleted={this.props.showCompleted}
        />
      );
    } else {
      return (
        <StudentItemButtons
          showLost={this.props.showLost}
          showFound={this.props.showFound}
        />
      );
    }
  }
  redirect() {
    this.setState({ redirect: true });
  }
  changePage = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    window.scrollTo(0, 0);
  };
  decreasePage = (e) => {
    this.setState({ currentPage: this.state.currentPage - 1 });
    window.scrollTo(0, 0);
  };
  increasePage = (e) => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    window.scrollTo(0, 0);
  };

  render() {
    const thisType = this.props.itemType;
    var headingDescription = "";
    var show = "YES";
    var user = this.props.userType;
    var pages = Math.floor(this.props.items.length / this.state.resultsPerPage);
    var remainder = this.props.items.length % this.state.resultsPerPage;
    if (remainder != 0) {
      pages += 1;
    }
    var pageNumbers = [];
    for (var i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
    var end = this.state.resultsPerPage * this.state.currentPage;
    var start = this.state.resultsPerPage * (this.state.currentPage - 1);

    if (this.props.items.length <= 0 && this.props.action === "SEARCH") {
      headingDescription = "No Results Found.";
      show = "NO";
    } else if (this.props.action === "SEARCH") {
      headingDescription = `Showing results for "${this.props.searchKey}".`;
      show = "NO";
    } else if (thisType === "LOST") {
      headingDescription =
        "You can find lost items or give some information about them in this section.";
    } else if (thisType === "COMPLETED") {
      headingDescription = "You can find completed items here.";
      show = "COMPLETED";
    } else if (thisType === "MYITEMS") {
      headingDescription = "";
      show = "NO";
    } else {
      headingDescription =
        "You can find items that were found or give some information about them in this section.";
    }

    return (
      <React.Fragment>
        <br />

        <div className="container center">
          <div className="row">
            <div className="col text-center">
              <div className="pill">
                {this.displayItemButtons(user)}

                <br />

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="home">
                    <p>{headingDescription}</p>
                    {this.displayCreateButton(show)}

                    <br />
                    <br />

                    <div className="row">
                      <Items
                        items={this.props.items.slice(start, end)}
                        uid={this.props.uid}
                        thisType={this.props.itemType}
                      />
                    </div>
                    <PageNumbers
                      pageNumbers={pageNumbers}
                      changePage={this.changePage}
                      currentPage={this.state.currentPage}
                      increasePage={this.increasePage}
                      decreasePage={this.decreasePage}
                    />
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

export default ItemList;
