import React, { Component } from "react";
import axios from "axios";
import Claimants from "./Claimants";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default class ClaimList extends Component {
  state = {
    itemId: "",
    itemDetails: [],
    posterDetails: [],
    claimants: [],
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const itemId = params.itemId;
    this.setState({ itemId: itemId });
    const url = `/laf/${itemId}`;
    axios.get(`${url}`).then((res) => this.setState({ itemDetails: res.data }));
    const url2 = `/messages/getClaimants?itemId=${itemId}`;
    axios.get(`${url2}`).then((res) => this.setState({ claimants: res.data }));
  }

  confirmClaim = (uid) => {
    var url = `/messages/rejectClaim?uid=${uid}&itemId=${this.state.itemId}`;
    var url2 = `/messages/acceptClaim?uid=${uid}&itemId=${this.state.itemId}`;
    var url3 = `/messages/itemCompleted?itemId=${this.state.itemId}`;
    console.log(uid);
    axios.put(`${url2}`);
    axios.put(`${url}`);
    axios.put(`${url3}`);
    window.location.reload(false);
  };

  render() {
    var image = this.state.itemDetails.item_image;
    const itemId = this.state.itemId;
    const studentId = this.state.itemDetails.student_id;
    const userType = "ADMIN";
    const url = `/AdminHome/messages/${studentId}/${itemId}/${userType}`;
    if (image === undefined) {
      image = "avatar.jpg";
    }
    return (
      <React.Fragment>
        <div class="container" style={{ marginTop: "20px" }}>
          <div class="modal-content">
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-5">
                  <div
                    id="carousel-thumb"
                    class="carousel slide carousel-fade carousel-thumbnails"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          class="img-responsive"
                          src={require(`../assets/images/${image}`)}
                          width="250px"
                          height="250px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h2 class="h2-responsive product-name">
                    <strong>{this.state.itemDetails.item_name}</strong>
                  </h2>
                  <p class="card-text">
                    Posted on:{" "}
                    <Moment format="YYYY/MM/DD hh:mma">
                      {this.state.itemDetails.post_date}
                    </Moment>
                  </p>
                  <p className="col=lg-7">
                    Posted by: {this.state.itemDetails.first_name}
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
                  </p>

                  <div
                    class="accordion md-accordion"
                    id="accordionEx"
                    role="tablist"
                    aria-multiselectable="true"
                  >
                    <div class="card">
                      <div class="card-header" role="tab" id="headingOne1">
                        <a
                          data-toggle="collapse"
                          data-parent="#accordionEx"
                          href="#collapseOne1"
                          aria-expanded="true"
                          aria-controls="collapseOne1"
                        >
                          <h5 class="mb-0">Item Description</h5>
                        </a>
                      </div>

                      <div
                        id="collapseOne1"
                        class="collapse show"
                        role="tabpanel"
                        aria-labelledby="headingOne1"
                        data-parent="#accordionEx"
                      >
                        <div class="card-body">
                          {this.state.itemDetails.item_description}
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header" role="tab" id="headingTwo2">
                        <a
                          class="collapsed"
                          data-toggle="collapse"
                          data-parent="#accordionEx"
                          href="#collapseTwo2"
                          aria-expanded="false"
                          aria-controls="collapseTwo2"
                        >
                          <h5 class="mb-0">Item Location</h5>
                        </a>
                      </div>

                      <div
                        id="collapseTwo2"
                        class="collapse show"
                        role="tabpanel"
                        aria-labelledby="headingTwo2"
                        data-parent="#accordionEx"
                      >
                        <div class="card-body">
                          {this.state.itemDetails.found_location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="h2-responsive product-name">
              <strong style={{ marginLeft: "10px" }}>Claimed By:</strong>
            </h4>
            <table class="table table-responsive table-light">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="tblth"
                    style={{ paddingLeft: "10px", marginTop: "10px" }}
                  >
                    Name
                  </th>
                  <th scope="col" class="tblth">
                    ID
                  </th>
                  <th scope="col" class="tblth">
                    Claimed Date
                  </th>
                  <th scope="col" class="tblth">
                    Claimant email
                  </th>
                  <th scope="col" class="tblth">
                    Claimant phone
                  </th>
                </tr>
              </thead>
              <tbody>
                <Claimants
                  claimants={this.state.claimants}
                  itemId={this.state.itemId}
                  complete_status={this.state.itemDetails.item_status}
                  confirmClaim={this.confirmClaim}
                />
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
