import React, { Component } from "react";

export default class PageNumbers extends Component {
  numberStyle(number) {
    if (number === this.props.currentPage) {
      return { marginLeft: "15px", backgroundColor: "#315d8b" };
    } else {
      return { marginLeft: "15px" };
    }
  }
  showNumbers() {
    var currentPageStyle = { backgroundColor: "blue" };
    return this.props.pageNumbers.map((pageNumber) => (
      <p
        onClick={this.props.changePage.bind(this, pageNumber)}
        style={this.numberStyle(pageNumber)}
      >
        {pageNumber}
      </p>
    ));
  }
  showPreviousButton() {
    if (this.props.currentPage != 1) {
      return (
        <button
          onClick={this.props.decreasePage}
          class="btn btn-primary"
          id="founditbtn"
        >
          {" "}
          &lt;&lt; Previous
        </button>
      );
    }
  }
  showNextButton() {
    if (this.props.currentPage != this.props.pageNumbers.length) {
      return (
        <button
          onClick={this.props.increasePage}
          class="btn btn-primary"
          id="founditbtn"
          style={{ marginLeft: "15px" }}
        >
          Next &gt;&gt;
        </button>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <br />
        <div className="row justify-content-center">
          <div>
            <p>Showing page {this.props.currentPage}</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {this.showPreviousButton()}

          {this.showNumbers()}
          {this.showNextButton()}
        </div>

        <br />
      </React.Fragment>
    );
  }
}
