import React, { Component } from "react";

export default class CompletedFilter extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="profile1">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle filter "
              id="drpdwnbtn"
              type="button"
              data-toggle="dropdown"
            >
              Filter
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" id="drpcaret">
              <li onClick={this.props.showCompleted}>
                <a> All</a>
              </li>
              <li onClick={this.props.filterCompletedLost}>
                <a> Lost items</a>
              </li>
              <li onClick={this.props.filterCompletedFound}>
                <a> Found items</a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
