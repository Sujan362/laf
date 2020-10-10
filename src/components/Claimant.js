import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default class Claimant extends Component {
  displayConfirm(studentId, complete_status) {
    if (complete_status !== "COMPLETED") {
      return (
        <button
          onClick={this.props.confirmClaim.bind(
            this,
            this.props.claimant.student_id
          )}
          class="btn btn-primary"
          id="founditbtnmd"
          style={{ marginLeft: "70px" }}
        >
          {" "}
          Confirm
        </button>
      );
    }
  }
  render() {
    const studentId = this.props.claimant.student_id;
    const itemId = this.props.itemId;
    const userType = "ADMIN";
    const url = `/AdminHome/messages/${studentId}/${itemId}/${userType}`;
    return (
      <React.Fragment>
        <tr>
          <td style={{ paddingTop: "25px" }}>
            {this.props.claimant.first_name}
          </td>
          <td style={{ paddingTop: "25px" }}>
            {this.props.claimant.student_id}
          </td>
          <td style={{ paddingTop: "25px" }}>
            <Moment format="YYYY/MM/DD hh:mma">
              {this.props.claimant.date}
            </Moment>
          </td>
          <td style={{ paddingTop: "25px" }}>
            {this.props.claimant.claimant_email}
          </td>
          <td style={{ paddingTop: "25px" }}>
            {this.props.claimant.claimant_phone}
          </td>
          <td style={{ paddingTop: "25px" }}>
            <span>
              <Link to={url}>
                <button
                  class="btn btn-primary"
                  id="founditbtnmd"
                  style={{ marginLeft: "70px" }}
                >
                  {" "}
                  Message
                </button>
              </Link>
            </span>
          </td>
          <td style={{ paddingTop: "25px" }}>
            <span>
              {this.displayConfirm(this.studentId, this.props.complete_status)}
            </span>
          </td>
          <td style={{ paddingTop: "25px" }}>
            {this.props.claimant.claimant_status}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
