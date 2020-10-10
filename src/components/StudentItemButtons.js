import React, { Component } from "react";

export default class StudentItemButtons extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <button onClick={this.props.showLost} class="btn" id="pillbtnlost">
              Lost Items
            </button>
          </li>

          <li className="nav-item">
            <button
              onClick={this.props.showFound}
              class="btn"
              id="pillbtnfound"
            >
              Found Items
            </button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
