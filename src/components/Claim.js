import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default class Claim extends Component {
  render() {
    const url = `/AdminHome/claimList/${this.props.claim.item_id}`;
    return (
      <React.Fragment>
        <Link class="col-sm-4" id="cardmargin" to={url}>
          <div class="card">
            <img
              class="img-responsive"
              src={require(`../assets/images/${this.props.claim.item_image}`)}
            />

            <div class="card-body">
              <h4 class="card-title">
                <strong>{this.props.claim.item_name}</strong>
              </h4>
              <p class="card-text" id="card-date">
                Posted on:
                <Moment format="YYYY/MM/DD hh:mma">
                  {this.props.claim.post_date}
                </Moment>
              </p>
              <a
                href="#!"
                class="orange-text "
                style={{ textDecoration: "None" }}
              >
                <h5 class="waves-effect waves-light">
                  {this.props.claim.count} claimants
                </h5>
              </a>
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
